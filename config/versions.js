const config = require('config');
const ConfigMap = require('@hrzn/k8s-configmap');
const Logger = require('../src/lib/Logger');
const mapVersionsConfig = require('./utils/mapVersionsConfig');

const configMap = new ConfigMap({
  namespace: 'platform',
  configmap: 'env-versions',
  selector: 'versions.yml',
  logger: Logger,
});

/**
 * Assign versions object to config
 *
 * @param versions
 */
function assignToConfig(versions) {
  Object.assign(config, mapVersionsConfig(versions));
}

/**
 * Load env-versions config map
 *
 * @return {Promise<void>}
 */
async function load() {
  Logger.info('⏳ Kubernetes [versions] ConfigMap loading...');

  let versions = {};

  // Load versions config map from kubernetes when service started on kubernetes
  if (process.env.NODE_ENV === 'production') {
    versions = await configMap.load();

    configMap.watch(assignToConfig);
  } else {
    // Set mocks to versions for local development environment
    versions = [{
      service: 'backoffice',
      version: 'dev',
    }];
  }

  assignToConfig(versions);

  Logger.info('✅ Kubernetes [versions] ConfigMap loaded successfully');
}

module.exports = { load };
