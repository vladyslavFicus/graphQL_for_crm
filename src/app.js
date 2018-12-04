require('./dotenv');
const express = require('express');
const jwtDecode = require('jwt-decode');
const { apolloUploadExpress } = require('apollo-upload-server');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const schema = require('./graphql/schema');
const Hierarchy = require('./services/Hierarchy');
const { getHierarchyUserSubtree } = require('./utils/hierarchyRequests');
const formatError = require('./utils/formatError');
const Logger = require('./utils/logger');
const loggerMiddleware = require('./middlewares/logger');
const { ENABLE_LOGGING } = process.env;

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
      logging: !!ENABLE_LOGGING,
    }),
    graphqlExpress(async ({ headers, ip }) => {
      const context = {
        headers,
        ip,
      };

      if (headers && headers.authorization && headers.authorization !== 'undefined') {
        const { brandId, user_uuid: userUUID, department } = jwtDecode(headers.authorization);

        const isAdministration = department === 'ADMINISTRATION';
        const hierarchy = new Hierarchy(isAdministration);

        if (!isAdministration) {
          const hierarchySubtree = await getHierarchyUserSubtree(userUUID, headers.authorization);

          hierarchy.setHierarchySubtree(hierarchySubtree);
        }

        Object.assign(context, {
          brand: global.appConfig.brands[brandId],
          hierarchy,
        });
      }

      return {
        schema,
        context,
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
