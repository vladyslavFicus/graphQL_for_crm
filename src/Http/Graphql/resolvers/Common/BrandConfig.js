const { get } = require('lodash');

module.exports = {
  brandName({ brandId, config }) {
    return get(JSON.parse(config), 'nas.brand.name', brandId);
  },
};
