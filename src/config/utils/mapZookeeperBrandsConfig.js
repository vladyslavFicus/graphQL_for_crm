const { get } = require('lodash');

module.exports = configs =>
  Object.entries(configs).reduce(
    (acc, [id, config]) => ({
      ...acc,
      [id]: {
        id,
        currency: get(config, 'nas.brand.currencies.base'),
        clickToCallUrl: get(config, 'nas.brand.clickToCall.url'),
      },
    }),
    {}
  );
