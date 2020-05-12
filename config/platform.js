const config = require('config');
const ConfigMap = require('@hrzn/k8s-configmap');
const Logger = require('../src/utils/logger');
const mapPlatformConfig = require('./utils/mapPlatformConfig');

const configMap = new ConfigMap({
  file: process.env.PLATFORM_CONFIG,
  namespace: 'platform',
  configmap: 'platform-config',
  selector: 'application-config.yml',
  logger: Logger,
});

async function load() {
  Logger.info('⏳ Kubernetes ConfigMap loading...');

  const platform = await configMap.load();

  Object.assign(config, mapPlatformConfig(platform));

  Logger.info('✅ Kubernetes ConfigMap loaded successfully');
}

module.exports = { load };
