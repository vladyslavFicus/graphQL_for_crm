const zookeeper = require('node-zookeeper-client');
const _ = require('lodash');
const { application, platform } = require('./core');

let configs;
const apiUrl = _.get(platform, 'hrzn.api_url');
const defaultBaseUrl = `${apiUrl}/${application.baseUrl}`;

function getZookeeperBrandPropertyPath(brand, property) {
  return `/system/${brand}/nas/brand/${property}`;
}

async function fetchBrandsConfigs() {
  const brands = _.get(platform, 'hrzn.brands', []);
  const zkGetData = require('../utils/zookeeperGetData');
  const zookeeperClient = zookeeper.createClient(platform.zookeeper.url);

  zookeeperClient.connect();

  const nextBrands = await Promise.all(
    brands.map(async id => {
      const currency = await zkGetData(zookeeperClient, getZookeeperBrandPropertyPath(id, 'nas.brand.currencies.base'));

      return {
        id,
        currency,
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
