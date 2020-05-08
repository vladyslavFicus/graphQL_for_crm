const config = require('config');
const fetch = require('./fetch');

const signInRequest = function(args) {
  return fetch(`${config.get('apiUrl')}/auth/signin/operator`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const chooseDepartmentRequest = function({ brandId, department }, authorization) {
  return fetch(`${config.get('apiUrl')}/auth/signin/operator/${brandId}/${department}`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization,
    },
  }).then(response => response.json());
};

module.exports = {
  signInRequest,
  chooseDepartmentRequest,
};
