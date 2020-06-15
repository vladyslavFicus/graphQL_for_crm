const fetch = require('./fetch');
const getBaseUrl = require('./getBaseUrl');

// # It was implemented in Auth2API
// # Can be removed after operator refactoring
const getAuthorities = (uuid, authorization) => {
  return fetch(`${getBaseUrl('auth2')}/users/${uuid}/authorities`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

// # It was implemented in Auth2API
// # Can be removed after operator refactoring
const addAuthorities = ({ uuid, ...args }, authorization) => {
  return fetch(`${getBaseUrl('auth2')}/users/${uuid}/authorities`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

// # It was implemented in Auth2API
// # Can be removed after operator refactoring
const removeAuthorities = ({ uuid, ...args }, authorization) => {
  return fetch(`${getBaseUrl('auth2')}/users/${uuid}/authorities`, {
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
  getAuthorities,
  addAuthorities,
  removeAuthorities,
};
