module.exports = config => ({
  env: config.env,
  apiUrl: config.hrzn.api_url,
  logstash: {
    host: config.logstash.url,
    port: 12201,
  },
  zookeeper: config.zookeeper.url,
  kafka: {
    address: config.kafka.address,
  },
});
