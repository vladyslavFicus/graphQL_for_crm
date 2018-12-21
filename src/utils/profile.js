const fetch = require('./fetch');
const parseJson = require('../utils/parseJson');

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

module.exports = { updateQueryTradingProfile, updateQueryProfile };
