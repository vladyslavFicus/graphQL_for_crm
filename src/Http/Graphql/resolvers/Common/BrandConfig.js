const { get } = require('lodash');
const config = require('config');

module.exports = {
  brandName({ brandId }) {
    return get(config.brandsConfig[brandId], 'nas.brand.name', brandId);
  },
};
