const { get } = require('lodash');

module.exports = configs => Object.entries(configs).map(([id, config]) => ({
  id,
  currency: get(config, 'nas.brand.currencies.base'),
  clickToCall: {
    didlogic: {
      url: get(config, 'nas.brand.clickToCall.url'),
    },
    asterisk: get(config, 'nas.brand.clickToCall.asterisk', {}),
    commpeak: get(config, 'nas.brand.clickToCall.commpeak', {}),
    coperato: get(config, 'nas.brand.clickToCall.coperato', {}),
  },
}));
