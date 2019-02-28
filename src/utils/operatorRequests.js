const fetch = require('./fetch');
const buildQueryString = require('./buildQueryString');

const getOperators = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/operator/operators?${buildQueryString(args)}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getOperatorsByUUIDs = (uuids, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/operator/operators/search?size=${uuids.length}`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ uuids }),
  }).then(response => response.json());
};

const getOperatorByUUID = (operatorId, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/operator/operators/${operatorId}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const createOperator = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/operator/operators`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const updateOperator = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/operator/operators/${args.uuid}`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

module.exports = {
  getOperators,
  createOperator,
  updateOperator,
  getOperatorsByUUIDs,
  getOperatorByUUID,
};
