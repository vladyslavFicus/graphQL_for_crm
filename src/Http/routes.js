const { createProxyMiddleware } = require('http-proxy-middleware');
const { ApolloServer } = require('apollo-server-express');
const graphqlUploadExpress = require('graphql-upload/graphqlUploadExpress.js');
const config = require('config');
const context = require('./Graphql/utils/context');
const dataSources = require('./Graphql/utils/dataSources');
const formatError = require('./Graphql/utils/formatError');
const engine = require('./Graphql/utils/engine');
const schema = require('./Graphql/schema');
const getBaseUrl = require('../utils/getBaseUrl');

const { NODE_ENV } = process.env;

module.exports = (app) => {
  // Enable Playground for all dev and qa environments
  const isPlayground = NODE_ENV === 'development' || !!config.env.match(/dev|qa/);

  // Backoffice version control middleware. Send 426 error if version doesn't match.
  app.use('/api', ({ headers, method }, res, next) => {
    if (method !== 'GET' && !headers.playground) {
      const application = headers['x-client-application'];
      const version = headers['x-client-version'];

      // Check if requests from QA application and skip version checking
      if (application === 'qa') {
        return next();
      }

      // Check backoffice version
      if (version !== config.versions.backoffice) {
        return res.status(426).send();
      }
    }

    return next();
  });

  // Healthcheck endpoint
  app.get('/health', (req, res) => res.status(200).json({ status: 'UP' }));

  // Proxy-pass to attachment service for download document file
  app.use('/api/documents/:fileUUID/file', createProxyMiddleware({
    target: getBaseUrl('attachments'),
    pathRewrite: (path, req) => {
      const { fileUUID } = req.params;

      return `/documents/${fileUUID}/file`;
    },
    changeOrigin: true,
  }));

  // Proxy-pass to attachment service to download file
  app.use('/api/attachment/:clientUUID/:fileUUID', createProxyMiddleware({
    target: getBaseUrl('attachments'),
    pathRewrite: (path, req) => {
      const { clientUUID, fileUUID } = req.params;

      return `/users/${clientUUID}/files/${fileUUID}`;
    },
    changeOrigin: true,
  }));

  // Proxy-pass to we-trading service to download report
  app.use('/api/report/:accountUuid', createProxyMiddleware({
    target: getBaseUrl('we-trading'),
    pathRewrite: (path, req) => {
      const { accountUuid } = req.params;

      return `/reports/account/${accountUuid}/detailed`;
    },
    changeOrigin: true,
  }));

  // =============== Apollo Server =============== //
  const server = new ApolloServer({
    schema,
    context,
    dataSources,
    formatError,
    engine,
    introspection: isPlayground,
    playground: isPlayground,
    uploads: false,
  });

  app.use(graphqlUploadExpress());

  server.applyMiddleware({
    app,
    path: '/api',
  });
};
