const config = require('config');
const fetch = require('./fetch');
const buildQueryString = require('./buildQueryString');

/**
 * Create trading account on MT4
 * @param args
 * @param authorization
 * @return {*}
 */
const createTradingAccount = (args, authorization) => {
  return fetch(`${config.get('apiUrl')}/trading-account/account`, {
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
  return fetch(`${config.get('apiUrl')}/trading-account/account`, {
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
  return fetch(`${config.get('apiUrl')}/trading-account/account/${args.accountUUID}/password`, {
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
    `${config.get('apiUrl')}/trading-account/account/search?${buildQueryString({
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

const tradingAccountsQuery = (args, authorization) => {
  return fetch(`${config.get('apiUrl')}/accountview/accounts/search?${buildQueryString(args)}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

/**
 * Change leverage on MT4
 * @param args
 * @param authorization
 * @return {*}
 */
const changeLeverage = (args, authorization) => {
  return fetch(`${config.get('apiUrl')}/trading-account/account/${args.accountUUID}/leverage`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => ({ success: response.status === 200 }));
};

/**
 * Approve change leverage on MT4
 * @param accountUUID
 * @param authorization
 * @return {*}
 */
const approveChangeLeverage = ({ accountUUID }, authorization) => {
  return fetch(`${config.get('apiUrl')}/trading-account/account/${accountUUID}/leverage/approve`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => ({ success: response.status === 200 }));
};

/**
 * Reject change leverage on MT4
 * @param accountUUID
 * @param authorization
 * @return {*}
 */
const rejectChangeLeverage = ({ accountUUID }, authorization) => {
  return fetch(`${config.get('apiUrl')}/trading-account/account/${accountUUID}/leverage/reject`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => ({ success: response.status === 200 }));
};

module.exports = {
  createTradingAccount,
  updateTradingAccount,
  tradingAccountChangePassword,
  tradingAccountQuery,
  tradingAccountsQuery,
  changeLeverage,
  approveChangeLeverage,
  rejectChangeLeverage,
};
