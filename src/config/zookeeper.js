const zookeeper = require('node-zookeeper-client');
const { getData, getChildren, configure } = require('@hrzn/zookeeper');
const Logger = require('../utils/logger');
const { platform } = require('./core');

let configs;

function getZookeeperBrandPropertyPath(brand, property) {
  return `/system/${brand}/nas/brand/${property}`;
}

async function fetchBrandsConfigs() {
  configure({ logger: e => Logger.info({ message: `Zookeeper.Event: ${e}` }) });

  const zookeeperClient = zookeeper.createClient(platform.zookeeper.url);

  zookeeperClient.connect();

  const brands = await getChildren(zookeeperClient, '/system');

  const nextBrands = await Promise.all(
    brands.map(async id => {
      const [currency, locale] = await Promise.all([
        getData(zookeeperClient, getZookeeperBrandPropertyPath(id, 'nas.brand.currencies.base')),
        getData(zookeeperClient, getZookeeperBrandPropertyPath(id, 'nas.brand.locale.defaultLanguage')),
      ]);

      return {
        id,
        currency,
        locale,
      };
    })
  );

  zookeeperClient.close();

  return nextBrands;
}

module.exports = async brand => {
  if (!configs) {
    configs = await fetchBrandsConfigs();
  }

  return configs.reduce((acc, curr) => ({ ...acc, [curr.id]: { ...curr } }), {});
};
