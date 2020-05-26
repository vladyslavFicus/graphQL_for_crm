const { get } = require('lodash');

module.exports = config => ({
  apiUrl: config.hrzn.api_url,
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
