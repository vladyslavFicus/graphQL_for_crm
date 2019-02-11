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
    context: ({ req: { headers, ip } }) => {
      const context = {
        requestId: v4(),
        headers,
        ip,
      };

      if (headers && headers.authorization && headers.authorization !== 'undefined') {
        const { brandId, user_uuid: userUUID } = jwtDecode(headers.authorization);

        Object.assign(context, {
          userUUID,
          brand: global.appConfig.brands[brandId],
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
