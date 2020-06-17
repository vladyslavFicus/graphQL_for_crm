const { AuthenticationError } = require('apollo-server-express');
const { get } = require('lodash');
const fetch = require('../../../utils/fetch');
const getBaseUrl = require('../../../utils/getBaseUrl');
const {
  getPermission: getPermissionRequest,
  getAuthorities: getAuthoritiesRequest,
  getAllAuthorities: getAllAuthoritiesRequest,
  changeClientPassword: changeClientPasswordRequest,
  changeOperatorPassword: changeOperatorPasswordRequest,
  resetUserPassword: resetUserPasswordRequest,
} = require('../../../utils/auth');

const changeClientPassword = (_, args, { headers: { authorization } }) => {
  return changeClientPasswordRequest(args, authorization);
};

const changeOperatorPassword = (_, args, { headers: { authorization } }) => {
  return changeOperatorPasswordRequest(args, authorization);
};

const resetUserPassword = (_, { userUuid }, { headers: { authorization } }) => {
  return resetUserPasswordRequest(userUuid, authorization);
};

const getCredentialsLock = async (_, { playerUUID }, { headers: { authorization } }) => {
  const { data } = await fetch(`${getBaseUrl('auth2')}/lock/${playerUUID}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());

  return data;
};

const removeCredentialsLock = (_, { playerUUID }, { headers: { authorization } }) => {
  return fetch(`${getBaseUrl('auth2')}/lock/${playerUUID}`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => ({ success: response.status === 200 }));
};

const getAuthoritiesOptions = async (_, __, { headers: { authorization }, brand: { id: brand } }) => {
  const response = await getAllAuthoritiesRequest(brand, authorization);

  const authorities = get(response, `data.authoritiesPerBrand.${brand}`) || [];
  const authoritiesOptions = {};

  authorities.map(({ department, role }) => {
    if (department === 'ADMINISTRATION' || department === 'PLAYER') {
      return;
    }

    if (Array.isArray(authoritiesOptions[department])) {
      return authoritiesOptions[department].push(role);
    }

    return (authoritiesOptions[department] = [role]);
  });

  if (authoritiesOptions.E2E) {
    delete authoritiesOptions.E2E;
  }

  return { data: { authoritiesOptions } };
};

const getAuthorities = (_, { uuid }, { headers: { authorization } }) => {
  return getAuthoritiesRequest(uuid, authorization);
};

const getPermissions = async (_, __, { headers: { authorization } }) => {
  const {
    data: { actions },
  } = await getPermissionRequest(authorization);

  return { data: actions };
};

const logout = (_, __, { headers: { authorization } }) => {
  return fetch(`${getBaseUrl('auth2')}/logout`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => ({ success: response.status === 200 }));
};

const tokenRenew = (_, __, { headers: { authorization } }) => {
  return fetch(`${getBaseUrl('auth2')}/token/renew`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(({ data, error }) => {
      if (get(error, 'error') === 'error.entity.not.found') {
        throw new AuthenticationError('Token is not valid for refreshing');
      }

      return { token: data.token };
    });
};

const resetPassword = (_, args, { headers: { authorization } }) => {
  return fetch(`${getBaseUrl('auth2')}/password/token`, {
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
  changeClientPassword,
  changeOperatorPassword,
  resetUserPassword,
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
