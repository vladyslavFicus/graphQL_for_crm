const { ApolloServer } = require('apollo-server-express');
const context = require('./Graphql/utils/context');
const dataSources = require('./Graphql/utils/dataSources');
const formatError = require('./Graphql/utils/formatError');
const schema = require('./Graphql/schema');

const { NODE_ENV, ENV_NAME } = process.env;

module.exports = app => {
  const server = new ApolloServer({
    schema,
    context,
    dataSources,
    formatError,
    introspection: NODE_ENV === 'development' || ENV_NAME === 'dev01',
    playground: NODE_ENV === 'development' || ENV_NAME === 'dev01',
  });

  server.applyMiddleware({
    app,
    path: '/gql',
  });

  // Healthcheck endpoint
  app.get('/health', (req, res) => res.status(200).json({ status: 'UP' }));
};
