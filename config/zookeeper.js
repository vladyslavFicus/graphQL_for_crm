const config = require('config');
const getBrandsConfig = require('@hrzn/brands-config');
const Logger = require('../src/utils/logger');
const mapZookeeperBrandsConfig = require('./utils/mapZookeeperBrandsConfig');

const options = {
  watchFunction: brandsConfig => {
    config.brands = mapZookeeperBrandsConfig(brandsConfig);

    Logger.info('✅ Zookeeper configuration updated successfully');
  },
  logger: Logger,
};

async function load() {
  Logger.info('⏳ Zookeeper configuration loading...');

  const brandsConfig = await getBrandsConfig(
    config.get('zookeeper'),
    ['nas.brand.currencies.base', 'nas.brand.clickToCall'],
    null,
    options
  );

  config.brands = mapZookeeperBrandsConfig(brandsConfig);

  Logger.info('✅ Zookeeper configuration loaded successfully');
}

module.exports = { load };
