const config = require('config');
const Zookeeper = require('@hrzn/zookeeper2');
const Logger = require('../src/lib/Logger');
const mapZookeeperBrandsConfig = require('./utils/mapZookeeperBrandsConfig');

/**
 * Assign brands object to config
 *
 * @param brands
 */
function assignToConfig(brands) {
  Object.assign(config, mapZookeeperBrandsConfig(brands));
}

async function load() {
  Logger.info('⏳ Brands configuration loading...');

  const zookeeper = new Zookeeper({
    host: config.get('zookeeper'),
    logger: Logger,
  });

  // Get and assign brands to config
  assignToConfig(await zookeeper.get('/brands'));

  // Add watcher to listen changes in /__last_updated_brands node and assign updated brands to config
  zookeeper.watch('/__last_updated_brands', async () => {
    assignToConfig(await zookeeper.get('/brands'));

    Logger.info('✅ Brands configuration updated successfully');
  });

  Logger.info('✅ Brands configuration loaded successfully');
}

module.exports = { load };
