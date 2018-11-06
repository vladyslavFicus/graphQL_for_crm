const express = require('express');
const jwtDecode = require('jwt-decode');
const { apolloUploadExpress } = require('apollo-upload-server');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const schema = require('./graphql/schema');
const formatError = require('./utils/formatError');
const Logger = require('./utils/logger');
const loggerMiddleware = require('./middlewares/logger');
const { ENABLE_LOGGING } = process.env;

process.on('unhandledRejection', reason => {
  Logger.error({ message: `Unhandled rejection, reason: ${reason}` });
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
      logging: !!ENABLE_LOGGING,
    }),
    graphqlExpress(request => {
      let brand = {};

      if (request.headers && request.headers.authorization && request.headers.authorization !== 'undefined') {
        const { brandId } = jwtDecode(request.headers.authorization);

        brand = global.appConfig.brands[brandId];
      }

      return {
        schema,
        context: { brand, headers: request.headers, ip: request.ip },
        formatError,
        tracing: true,
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

  app.listen(global.appConfig.port);
})();
