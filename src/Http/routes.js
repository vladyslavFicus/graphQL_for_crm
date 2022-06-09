const { createProxyMiddleware } = require('http-proxy-middleware');
const { ApolloServer } = require('apollo-server-express');
const graphqlUploadExpress = require('graphql-upload/graphqlUploadExpress.js');
const { register } = require('prom-client');
const createMetricsPlugin = require('apollo-metrics');
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

  const apolloMetricsPlugin = createMetricsPlugin(register);

  // Backoffice version control middleware. Send 426 error if version doesn't match.
  app.use('/gql', ({ headers, method }, res, next) => {
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

  // Apollo Server
  const server = new ApolloServer({
    schema,
    context,
    dataSources,
    formatError,
    engine,
    introspection: isPlayground,
    playground: isPlayground,

    // Apollo metrics to Prometheus (IMPORTANT: tracing needs to be enabled to get resolver and request timings)
    plugins: [apolloMetricsPlugin],
    tracing: true,
    uploads: false,
  });

  app.use(graphqlUploadExpress());

  server.applyMiddleware({
    app,
    path: '/gql',
  });

  // Healthcheck endpoint
  app.get('/health', (req, res) => res.status(200).json({ status: 'UP' }));

  // Prometheus metrics endpoint
  app.get('/prometheus', (_, res) => res.send(register.metrics()));

  // Proxy-pass to attachment service to download file
  app.use('/attachment/:clientUUID/:fileUUID', createProxyMiddleware({
    target: getBaseUrl('attachments'),
    pathRewrite: (path, req) => {
      const { clientUUID, fileUUID } = req.params;

      return `/users/${clientUUID}/files/${fileUUID}`;
    },
    changeOrigin: true,
  }));
};
