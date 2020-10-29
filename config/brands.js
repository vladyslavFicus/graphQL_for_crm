const config = require('config');
const Zookeeper = require('@hrzn/zookeeper2');
const Logger = require('../src/lib/Logger');
const mapZookeeperBrandsConfig = require('./utils/mapZookeeperBrandsConfig');

async function load() {
  Logger.info('⏳ Brands configuration loading...');

  const zookeeper = new Zookeeper({
    host: config.get('zookeeper'),
    logger: Logger,
  });

  // Get and assign brands to config
  const brandsConfig = await zookeeper.get('/brands');

  config.brands = mapZookeeperBrandsConfig(brandsConfig);
  config.brandsConfig = brandsConfig;

  // Add watcher to listen changes in /__last_updated_brands node and assign updated brands to config
  zookeeper.watch('/__last_updated_brands', async () => {
    const newBrandsConfig = await zookeeper.get('/brands');

    config.brands = mapZookeeperBrandsConfig(newBrandsConfig);
    config.brandsConfig = newBrandsConfig;

    Logger.info('✅ Brands configuration updated successfully');
  });

  Logger.info('✅ Brands configuration loaded successfully');
}

module.exports = { load };
