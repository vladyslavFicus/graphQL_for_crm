const fetch = require('./fetch');

const getForexOperator = (operatorUUID, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/affiliate/operator/${operatorUUID}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const createForexOperator = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/affiliate/operator`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const updateForexOperator = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/affiliate/operator`, {
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
  getForexOperator,
  createForexOperator,
  updateForexOperator,
};
