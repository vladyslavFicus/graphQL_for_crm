require('isomorphic-fetch');
const { get } = require('lodash');
const contextService = require('request-context');
const cors = require('cors');
const compression = require('compression');
const elasticsearch = require('elasticsearch');
const parseElasticSearchHosts = require('./utils/parseElasticSearchHosts');
const zookeeper = require('./config/zookeeper');
const Logger = require('./utils/logger');
const { ENABLE_LOGGING } = process.env;

module.exports = async app => {
  app.disable('x-powered-by');
  app.disable('etag');

  global.appConfig = require('./config');
  await zookeeper.load();
  global.appClients = {};
  global.cache = { operators: {} };
  global.isLoggingEnabled = !!(ENABLE_LOGGING && ENABLE_LOGGING === 'true');

  const elasticSearchUrl = get(global, 'appConfig.elasticsearch.url');
  if (elasticSearchUrl) {
    const elasticSearchHosts = parseElasticSearchHosts(elasticSearchUrl);

    global.appClients.esClient = new elasticsearch.Client({ hosts: elasticSearchHosts, log: [{}] });
  }

  if (!global.appClients.esClient) {
    Logger.error({ message: 'ElasticSearch client not configured!' });

    process.exit(1);
    return;
  }

  app.use(compression());
  app.use(cors());
  app.use(contextService.middleware('request'));
  app.use((req, res, next) => {
    contextService.set('request:req', req);
    contextService.set('request:res', res);

    next();
  });
};
