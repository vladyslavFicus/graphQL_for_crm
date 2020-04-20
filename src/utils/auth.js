const fetch = require('./fetch');
const buildQueryString = require('./buildQueryString');

const getPermission = authorization => {
  return fetch(`${global.appConfig.apiUrl}/auth2/users/actions`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const changeClientPassword = ({ clientUuid, ...args }, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/auth2/password/player/${clientUuid}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => ({ success: response.status === 200 }));
};

const changeOperatorPassword = ({ operatorUuid, ...args }, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/auth2/password/operator/${operatorUuid}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => ({ success: response.status === 200 }));
};

const resetUserPassword = (userUuid, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/auth2/password/user/${userUuid}/reset`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      authorization,
      'Content-Type': 'application/json',
    },
  }).then(response => ({ success: response.status === 200 }));
};

const getAllAuthorities = (brand, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/auth2/authorities?${buildQueryString({ brand })}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getAuthorities = (uuid, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/auth2/users/${uuid}/authorities`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const addAuthorities = ({ uuid, ...args }, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/auth2/users/${uuid}/authorities`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const removeAuthorities = ({ uuid, ...args }, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/auth2/users/${uuid}/authorities`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

module.exports = {
  getPermission,
  changeClientPassword,
  changeOperatorPassword,
  resetUserPassword,
  getAllAuthorities,
  getAuthorities,
  addAuthorities,
  removeAuthorities,
};
