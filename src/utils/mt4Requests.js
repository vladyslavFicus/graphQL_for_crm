const fetch = require('./fetch');

/**
 * Create trading account on MT4
 * @param args
 * @param authorization
 * @return {*}
 */
const createTradingAccount = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_mt4_updater/user`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

/**
 * Change trading account password on MT4
 * @param args
 * @param authorization
 * @return {*}
 */
const tradingAccountChangePassword = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_mt4_updater/user/password`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

module.exports = {
  createTradingAccount,
  tradingAccountChangePassword,
};
