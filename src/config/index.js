const { URL } = require('url');
const { get, keys } = require('lodash');
const { platform } = require('./core');

const { PORT } = process.env;

module.exports = {
  name: 'backoffice-graphql',
  port: PORT || 3000,
  apiUrl: __DEV__ ? get(platform, 'hrzn.api_url') : 'http://kong',
  logstash: {
    host: new URL(platform.logstash.url).hostname,
    port: 12201,
  },
  elasticsearch: platform.elasticsearch6,
};
