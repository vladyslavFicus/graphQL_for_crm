const config = require('config');
const fetch = require('./fetch');

const addAuthorities = (args, authorization) => {
  return fetch(`${config.get('apiUrl')}/auth/credentials/${args.uuid}/authorities`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const removeAuthorities = ({ uuid, department, role, brandId }, authorization) => {
  return fetch(`${config.get('apiUrl')}/auth/credentials/${uuid}/authorities`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      department,
      role,
      brandId,
    }),
  }).then(response => response.json());
};

const getAuthorities = (uuid, authorization) => {
  return fetch(`${config.get('apiUrl')}/auth/credentials/${uuid}/authorities`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getPermission = authorization => {
  return fetch(`${config.get('apiUrl')}/auth/permissions`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

module.exports = {
  addAuthorities,
  removeAuthorities,
  getAuthorities,
  getPermission,
};
