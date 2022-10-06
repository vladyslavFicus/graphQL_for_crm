module.exports = config => ({
  env: config.env,
  prefix: config.prefix || '',
  apiUrl: config.hrzn.api_url,
  logstash: {
    host: config.logstash.url,
    port: config.logstash.port || 12201,
  },
  zookeeper: config.zookeeper.url,
  kafka: {
    address: config.kafka.address,
  },
  s3: {
    url: config.cloud_static.url,
    bucket: config.cloud_static.bucket,
  },
});
