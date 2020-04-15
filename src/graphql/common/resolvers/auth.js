const fetch = require('../../../utils/fetch');
const parseJson = require('../../../utils/parseJson');
const { getAuthorities: getAuthoritiesRequest, getPermission: getPermissionRequest } = require('../../../utils/auth');

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

const getAuthoritiesOptions = (_, args, { headers: { authorization }, userUUID }) => {
  return fetch(`${global.appConfig.apiUrl}/auth/credentials/${userUUID}/authorities`, {
    method: 'OPTIONS',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getAuthorities = (_, { uuid }, { headers: { authorization } }) => getAuthoritiesRequest(uuid, authorization);

const getPermissions = async (_, __, { headers: { authorization } }) => {
  const response = await getPermissionRequest(authorization);

  return { data: response.data.actions };
};

const logout = (_, __, { headers: { authorization } }) => {
  return fetch(`${global.appConfig.apiUrl}/auth2/logout`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => ({ success: response.status === 200 }));
};

const tokenRenew = (_, __, { headers: { authorization } }) => {
  return fetch(`${global.appConfig.apiUrl}/auth2/token/renew`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(({ data: { token } }) => ({ token }));
};

const resetPassword = (_, args, { headers: { authorization } }) => {
  return fetch(`${global.appConfig.apiUrl}/auth2/password/token`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => ({ success: response.status === 200 }));
};

module.exports = {
  credentials: {
    getLoginLock: getCredentialsLock,
    removeLoginLock: removeCredentialsLock,
    getAuthorities,
    getPermissions,
    getAuthoritiesOptions,
    tokenRenew,
  },
  resetPassword,
  logout,
};
