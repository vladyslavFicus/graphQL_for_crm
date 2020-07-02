const { ApolloServer } = require('apollo-server-express');
const { register } = require('prom-client');
const createMetricsPlugin = require('apollo-metrics');
const context = require('./Graphql/utils/context');
const dataSources = require('./Graphql/utils/dataSources');
const formatError = require('./Graphql/utils/formatError');
const schema = require('./Graphql/schema');

const { NODE_ENV, ENV_NAME } = process.env;

module.exports = (app) => {
  const apolloMetricsPlugin = createMetricsPlugin(register);

  const server = new ApolloServer({
    schema,
    context,
    dataSources,
    formatError,
    introspection: NODE_ENV === 'development' || ENV_NAME === 'dev01',
    playground: NODE_ENV === 'development' || ENV_NAME === 'dev01',

    plugins: [apolloMetricsPlugin],
    // IMPORTANT: tracing needs to be enabled to get resolver and request timings!
    tracing: true,
  });

  server.applyMiddleware({
    app,
    path: '/gql',
  });

  // Healthcheck endpoint
  app.get('/health', (req, res) => res.status(200).json({ status: 'UP' }));

  // Prometheus metrics endpoint
  app.get('/prometheus', (_, res) => res.send(register.metrics()));
};
