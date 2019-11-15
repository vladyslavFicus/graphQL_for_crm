const getBrandsConfig = require('@hrzn/brands-config');
const Logger = require('../utils/logger');
const mapZookeeperBrandsConfig = require('./utils/mapZookeeperBrandsConfig');
const { platform } = require('./core');

const options = {
  watchFunction: brandsConfig => {
    global.appConfig.brands = mapZookeeperBrandsConfig(brandsConfig);

    Logger.info('✅ Zookeeper configuration updated successfully');
  },
  logger: Logger,
};

async function load() {
  Logger.info('⏳ Zookeeper configuration loading...');

  const brandsConfig = await getBrandsConfig(
    platform.zookeeper.url,
    ['nas.brand.currencies.base', 'nas.brand.clickToCall.url'],
    null,
    options
  );

  global.appConfig.brands = mapZookeeperBrandsConfig(brandsConfig);

  Logger.info('✅ Zookeeper configuration loaded successfully');
}

module.exports = { load };
