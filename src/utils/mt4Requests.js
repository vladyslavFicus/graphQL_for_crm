const fetch = require('./fetch');
const parseJson = require('./parseJson');

/**
 * Get available currencies to create trading account
 * @param brandId
 * @param authorization
 * @return {Promise|*|PromiseLike<T | never>|Promise<T | never>}
 */
const getAvailableCurrencies = (brandId, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_mt4_updater/groups/currencies?brandId=${brandId}`, {
    method: 'GET',
    headers: {
      authorization,
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response));
};

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
  });
};

module.exports = {
  getAvailableCurrencies,
  createTradingAccount,
};
