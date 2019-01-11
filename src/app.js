require('./dotenv');
const express = require('express');
const jwtDecode = require('jwt-decode');
const { apolloUploadExpress } = require('apollo-upload-server');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const schema = require('./graphql/schema');
const Hierarchy = require('./services/Hierarchy');
const formatError = require('./utils/formatError');
const Logger = require('./utils/logger');
const loggerMiddleware = require('./middlewares/logger');

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
  app.use(
    '/gql',
    bodyParser.json(),
    apolloUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
    loggerMiddleware({
      logging: global.isLoggingEnabled,
    }),
    graphqlExpress(async ({ headers, ip }) => {
      const context = {
        headers,
        ip,
      };

      if (headers && headers.authorization && headers.authorization !== 'undefined') {
        const { brandId, user_uuid: userUUID } = jwtDecode(headers.authorization);

        Object.assign(context, {
          userUUID,
          brand: global.appConfig.brands[brandId],
          hierarchy: new Hierarchy(userUUID, headers.authorization),
        });
      }

      return {
        schema,
        context,
        formatError,
      };
    })
  );
  app.get(
    '/graphiql',
    graphiqlExpress({
      endpointURL: `${global.appConfig.baseUrl}/gql`,
    })
  );
  app.get('/health', (req, res) => res.status(200).json({ status: 'UP' }));

  app.use('/player', require('./routes/player'));

  app.listen(global.appConfig.port, () => Logger.info('Service started'));
})();
