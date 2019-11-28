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

const getOperatorsByUUIDs = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/operator/operators/search?size=${args.uuids.length}`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
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

const resetToken = (uuid, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/operator/operators/reset-token?operatorUUID=${uuid}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.text());
};

const createOperator = (args, authorization) => {
  console.log('createOperatorRequestArgs: ', args);
  return fetch(`${global.appConfig.apiUrl}/operator/operators`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  })
    .then(response => response.json())
    .then(data => {
      console.log('createOperatorResponseData: ', data);
      return data;
    });
};

const activateOperator = (args, authorization, brandId) => {
  return fetch(`${global.appConfig.apiUrl}/operator/public/operators/activate?brandId=${brandId}`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const changeStatus = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/operator/operators/status`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => ({ success: response.status === 200 }));
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

const sendInvitation = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/operator/operators/${args.uuid}/send/invitation`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => ({ success: response.status === 200 }));
};

module.exports = {
  getOperatorsByUUIDs,
  getOperatorByUUID,
  activateOperator,
  createOperator,
  updateOperator,
  sendInvitation,
  changeStatus,
  getOperators,
};
