const { get } = require('lodash');

module.exports = configs => Object.entries(configs).map(([id, config]) => ({
  id,
  currency: get(config, 'nas.brand.currencies.base'),
  sms: {
    fullSms: get(config, 'nas.brand.sms.fullSms', {}),
  },
}));
