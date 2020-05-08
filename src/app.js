require('isomorphic-fetch');
const express = require('express');
const contextService = require('request-context');
const cors = require('cors');
const compression = require('compression');
const config = require('config');
const bootstrap = require('./bootstrap');
const initRoutes = require('./initRoutes');
const Logger = require('./utils/logger');

process.on('unhandledRejection', err => {
  Logger.fatal({ err }, 'Unhandled rejection');
});

process.on('uncaughtException', err => {
  Logger.fatal({ err }, 'Uncaught exception');
});

(async () => {
  const app = express();

  app.disable('x-powered-by');
  app.disable('etag');
  app.set('trust proxy', true);

  // Bootstrap application
  await bootstrap(app);

  app.use(compression());
  app.use(cors());
  app.use(contextService.middleware('request'));
  app.use((req, res, next) => {
    contextService.set('request:req', req);
    contextService.set('request:res', res);

    next();
  });

  // Init all routes
  initRoutes(app);

  const server = app.listen(config.port, '0.0.0.0', () => {
    Logger.info(`🚀 Server ready at http://localhost:${config.port}`);
  });

  process.on('SIGINT', () => {
    server.close();
  });
})();
