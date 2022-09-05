const config = require('config');
const Zookeeper = require('@hrzn/zookeeper2');
const Logger = require('../src/lib/Logger');
const mapZookeeperBrandsConfig = require('./utils/mapZookeeperBrandsConfig');

async function load() {
  // Need to cost optimization for dev/qa/stage envs
  const PREFIX = config.get('prefix');

  const BRANDS_NODE = `/${PREFIX}brands`;
  const LAST_UPDATED_BRANDS_NODE = `/${PREFIX}__last_updated_brands`;

  Logger.info('⏳ Brands configuration loading...');

  const zookeeper = new Zookeeper({
    host: config.get('zookeeper'),
    logger: Logger,
  });

  // Get and assign brands to config
  const brandsConfig = await zookeeper.get(BRANDS_NODE);

  config.brands = mapZookeeperBrandsConfig(brandsConfig);
  config.brandsConfig = brandsConfig;

  // Add watcher to listen changes in /__last_updated_brands node and assign updated brands to config
  zookeeper.watch(LAST_UPDATED_BRANDS_NODE, async () => {
    const newBrandsConfig = await zookeeper.get(BRANDS_NODE);

    config.brands = mapZookeeperBrandsConfig(newBrandsConfig);
    config.brandsConfig = newBrandsConfig;

    Logger.info('✅ Brands configuration updated successfully');
  });

  Logger.info('✅ Brands configuration loaded successfully');
}

module.exports = { load };
