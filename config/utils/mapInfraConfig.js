module.exports = config => ({
  env: config.env,
  apiUrl: config.hrzn.api_url,
  logstash: {
    host: config.logstash.url,
    port: 12201,
  },
  zookeeper: config.zookeeper[__DEV__ ? 'ext_url' : 'url'], // Using 'ext_url' for local environment and 'url' in k8s
  kafka: {
    address: config.kafka[__DEV__ ? 'ext_address' : 'address'], // Using 'ext_address' for local and 'address' in k8s
  },
});
