const fetch = require('./fetch');
const getBaseUrl = require('./getBaseUrl');

const signInRequest = args => {
  return fetch(`${getBaseUrl('auth2')}/operator/signin`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const chooseDepartmentRequest = (args, authorization) => {
  return fetch(`${getBaseUrl('auth2')}/operator/department`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization,
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

module.exports = {
  signInRequest,
  chooseDepartmentRequest,
};
