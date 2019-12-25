require('./dotenv');
const express = require('express');
const jwtDecode = require('jwt-decode');
const { ApolloServer } = require('apollo-server-express');
const { v4 } = require('uuid');
const schema = require('./graphql/schema');
const { createDataloaders } = require('./graphql/dataloaders');
const LoggerExtension = require('./graphql/extensions/LoggerExtension');
const Hierarchy = require('./services/Hierarchy');
const Logger = require('./utils/logger');

process.on('unhandledRejection', err => {
  Logger.fatal({ err }, 'Unhandled rejection');
});

process.on('uncaughtException', err => {
  Logger.fatal({ err }, 'Uncaught exception');
});

(async () => {
  const app = express();

  await require('./bootstrap')(app);

  app.set('trust proxy', true);

  app.get('/health', (req, res) => res.status(200).json({ status: 'UP' }));

  app.use('/player', require('./routes/player'));

  const server = new ApolloServer({
    schema,
    extensions: global.isLoggingEnabled && [() => new LoggerExtension()],
    context: ({ req: { headers, ip, body } }) => {
      const context = {
        requestId: v4(),
        headers,
        ip,
      };

      const operationName = Array.isArray(body) ? body[0].operationName : body.operationName;

      if (headers && headers.authorization && headers.authorization !== 'undefined') {
        const { brandId, user_uuid: userUUID } = jwtDecode(headers.authorization);

        // Return context if token without brandId field
        if (!brandId) {
          return context;
        }

        const brand = global.appConfig.brands[brandId];

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

  app.listen(global.appConfig.port, () => Logger.info('Service started'));
})();
