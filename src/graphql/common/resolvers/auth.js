const fetch = require('../../../utils/fetch');
const parseJson = require('../../../utils/parseJson');
const { getAuthorities: getAuthoritiesRequest } = require('../../../utils/auth');

const getCredentialsLock = function(_, { playerUUID }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/auth/credentials/${playerUUID}/lock`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response));
};

const removeCredentialsLock = function(_, { playerUUID }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/auth/credentials/${playerUUID}/lock`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  })
    .then(response => response.text().then(text => ({ status: response.status, text })))
    .then(response => ({ ...response, json: parseJson(response.text) }))
    .then(response =>
      response.status === 200 ? { data: { success: true } } : { error: response.json, data: { success: false } }
    );
};

const getAuthorities = (_, { uuid }, { headers: { authorization } }) => getAuthoritiesRequest(uuid, authorization);

module.exports = {
  credentials: {
    getLoginLock: getCredentialsLock,
    removeLoginLock: removeCredentialsLock,
    getAuthorities,
  },
};
