const fetch = require('./fetch');
const getBaseUrl = require('./getBaseUrl');
const buildQueryString = require('./buildQueryString');

/**
 * Get trading account
 *
 * Implemented in TradingAccountAPI
 *
 * Will be removed after old ProfileViewType will be deleted
 *
 * @param args
 * @param authorization
 * @return {*}
 */
const tradingAccountQuery = ({ accountType, uuid }, authorization) => {
  return fetch(
    `${getBaseUrl('trading-account')}/account/search?${buildQueryString({
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
  tradingAccountQuery,
};
