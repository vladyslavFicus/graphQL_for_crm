const config = require('config');
const ConfigMap = require('@hrzn/k8s-configmap');
const Logger = require('../src/lib/Logger');
const mapInfraConfig = require('./utils/mapInfraConfig');

const configMap = new ConfigMap({
  file: process.env.INFRA_CONFIG,
  namespace: process.env.NAMESPACE,
  configmap: 'infra-config',
  selector: 'infra-config.yml',
  logger: Logger,
});

async function load() {
  Logger.info('⏳ Kubernetes [infra] ConfigMap loading...');

  const platform = await configMap.load();

  Object.assign(config, mapInfraConfig(platform));

  Logger.info('✅ Kubernetes [infra] ConfigMap loaded successfully');
}

module.exports = { load };
