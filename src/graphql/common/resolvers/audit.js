const fetch = require('../../../utils/fetch');

const getFeeds = function(_, args, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/forex_audit/logs/search`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const getFeedTypes = function(_, { playerUUID }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/forex_audit/logs/${playerUUID}/types`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

module.exports = {
  getFeeds,
  getFeedTypes,
};
