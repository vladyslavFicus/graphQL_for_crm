const { URL } = require('url');
const { get, keys } = require('lodash');
const { application, platform, applicationSecret } = require('./core');

const { PORT, BASE_URL, PORTAINER_URL } = process.env;

module.exports = {
  ...application,
  sentry: {
    dsn: 'https://6cecc2390c874c4d91d4c6ee98245f89@sentry.io/1311966',
  },
  secrets: get(applicationSecret, 'credentials', {}),
  baseUrl: BASE_URL === undefined ? '/graphql' : BASE_URL,
  port: PORT || 3000,
  apiUrl: get(platform, 'hrzn.api_url'),
  cmsUrl: get(platform, 'hrzn.api_url').replace(/(https?:\/\/)api\./, '$1cms.'),
  portainerUrl: PORTAINER_URL || 'http://portainer:9000',
  logstash: {
    host: new URL(platform.logstash.url).hostname,
    port: 12201,
  },
  elasticsearch: platform.elasticsearch,
};
