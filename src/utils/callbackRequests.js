const fetch = require('./fetch');
const getBaseUrl = require('./getBaseUrl');

const getCallbacks = (args, authorization) => {
  return fetch(`${getBaseUrl('callback')}/search`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const createCallback = (args, authorization) => {
  return fetch(`${getBaseUrl('callback')}/`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const updateCallback = ({ callbackId, ...args }, authorization) => {
  return fetch(`${getBaseUrl('callback')}/${callbackId}`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.status === 200);
};

module.exports = {
  getCallbacks,
  createCallback,
  updateCallback,
};
