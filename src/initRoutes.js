const { ApolloServer } = require('apollo-server-express');
const { v4 } = require('uuid');
const jwtDecode = require('jwt-decode');
const config = require('config');
const { LoggerExtension } = require('@hrzn/apollo-extension');
const Logger = require('./utils/logger');
const schema = require('./graphql/schema');
const { createDataloaders } = require('./graphql/dataloaders');
const Hierarchy = require('./services/Hierarchy');

const { NODE_ENV, ENV_NAME } = process.env;

module.exports = app => {
  const server = new ApolloServer({
    schema,
    extensions: [() => new LoggerExtension(Logger)],
    introspection: NODE_ENV === 'development' || ENV_NAME === 'dev01',
    playground: NODE_ENV === 'development' || ENV_NAME === 'dev01',
    context: ({ req: { headers, ip, body } }) => {
      const context = {
        requestId: v4(),
        headers,
        ip,
      };

      if (headers && headers.authorization && headers.authorization !== 'undefined') {
        const { brandId, uuid: userUUID } = jwtDecode(headers.authorization);

        // Return context if token without brandId field
        if (!brandId) {
          return context;
        }

        const brand = config.get('brands')[brandId];

        // Throw an error if brand wasn't found
        if (!brand) {
          throw new Error('Brand not found in brand configuration');
        }

        Object.assign(context, {
          userUUID,
          brand,
          hierarchy: new Hierarchy(userUUID, headers.authorization),
          dataloaders: createDataloaders(headers.authorization, brandId),
        });
      }

      return context;
    },
  });

  server.applyMiddleware({
    app,
    path: '/gql',
  });

  // Healthcheck endpoint
  app.get('/health', (req, res) => res.status(200).json({ status: 'UP' }));
};
