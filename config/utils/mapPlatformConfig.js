const { get } = require('lodash');

module.exports = config => ({
  apiUrl: __DEV__ ? get(config, 'hrzn.api_url') : 'http://kong',
  logstash: {
    host: config.logstash.url,
    port: 12201,
  },
  zookeeper: config.zookeeper.url,
  brokeree: {
    apiKey: get(config, 'brokeree.api_key', null),
    cabinetUrl: get(config, 'brokeree.cabinet_url', null),
    managerLogin: get(config, 'brokeree.manager_login', null),
  },
});
