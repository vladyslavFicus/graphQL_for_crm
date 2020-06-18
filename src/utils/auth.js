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

module.exports = {
  getAuthorities,
};
