const fetch = require('./fetch');
const parseJson = require('../utils/parseJson');
const buildQueryString = require('../utils/buildQueryString');

const createQueryHrznProfile = args => {
  return fetch(`${global.appConfig.apiUrl}/profile/public/signup?${buildQueryString({ brandId: args.brandId })}`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json().then(({ data, error }) => ({ status: response.status, data, error })));
};

const createQueryTradingProfile = args => {
  return fetch(`${global.appConfig.apiUrl}/trading_profile/public/create`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json().then(({ data, error }) => ({ status: response.status, data, error })));
};

const updateQueryTradingProfile = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_profile/`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  })
    .then(response => response.text())
    .then(response => parseJson(response));
};

const updateQueryProfile = (args, playerUUID, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/profile/profiles/${playerUUID}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization,
    },
    body: JSON.stringify(args),
  })
    .then(response => response.text())
    .then(response => parseJson(response));
};

module.exports = {
  createQueryHrznProfile,
  createQueryTradingProfile,
  updateQueryTradingProfile,
  updateQueryProfile,
};
