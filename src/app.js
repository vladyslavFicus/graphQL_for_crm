require('isomorphic-fetch');
const express = require('express');
const config = require('config');
const contextService = require('request-context');
const Logger = require('./lib/Logger');
const initRoutes = require('./Http/routes');
const bootstrap = require('./bootstrap');

process.on('unhandledRejection', err => {
  Logger.error({ err }, 'unhandled rejection');
});

process.on('uncaughtException', err => {
  Logger.error({ err }, 'uncaught exception');
});

process.on('warning', err => {
  Logger.warn({ err }, 'warning');
});

(async () => {
  const app = express();

  app.set('trust proxy', true);

  // Bootstrap application
  await bootstrap(app);

  // Init request context middleware
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
