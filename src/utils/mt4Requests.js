const fetch = require('./fetch');
const buildQueryString = require('./buildQueryString');

/**
 * Create trading account on MT4
 * @param args
 * @param authorization
 * @return {*}
 */
const createTradingAccount = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading-account/account`, {
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
 * Update trading account on MT4
 * @param args
 * @param authorization
 * @return {*}
 */
const updateTradingAccount = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading-account/account`, {
    method: 'PUT',
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
  return fetch(`${global.appConfig.apiUrl}/trading-account/account/${args.accountUUID}/password`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

/**
 * Get trading account
 * @param args
 * @param authorization
 * @return {*}
 */
const tradingAccountQuery = ({ accountType, uuid }, authorization) => {
  return fetch(
    `${global.appConfig.apiUrl}/trading-account/account/search?${buildQueryString({
      profileUUID: uuid,
      accountType: accountType ? accountType : '',
    })}`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization,
        'content-type': 'application/json',
      },
    }
  ).then(response => response.json().then(({ data }) => data));
};

module.exports = {
  createTradingAccount,
  updateTradingAccount,
  tradingAccountChangePassword,
  tradingAccountQuery,
};
