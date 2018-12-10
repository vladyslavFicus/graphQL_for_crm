const fetch = require('./fetch');
const parseJson = require('./parseJson');
const buildQueryString = require('./buildQueryString');

const getCallbacks = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_callback/?${buildQueryString(args)}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => response);
};

const createCallback = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_callback/`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => response);
};

const updateCallback = ({ callbackId, ...args }, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_callback/${callbackId}`, {
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
