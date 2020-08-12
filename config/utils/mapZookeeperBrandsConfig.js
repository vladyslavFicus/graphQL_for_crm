const { get } = require('lodash');

module.exports = configs => ({
  brands: Object.entries(configs).reduce(
    (acc, [id, config]) => ({
      ...acc,
      [id]: {
        id,
        currency: get(config, 'nas.brand.currencies.base'),
        clickToCall: {
          didlogic: {
            url: get(config, 'nas.brand.clickToCall.url'),
          },
          asterisk: get(config, 'nas.brand.clickToCall.asterisk', {}),
        },
      },
    }),
    {},
  ),
});
