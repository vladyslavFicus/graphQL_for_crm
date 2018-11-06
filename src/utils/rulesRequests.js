const fetch = require('./fetch');
const parseJson = require('./parseJson');
const buildQueryString = require('./buildQueryString');

const getRules = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_rules_profile/?${buildQueryString(args)}`, {
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

const createRule = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_rules_profile/`, {
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

const deleteRule = (uuid, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_rules_profile/${uuid}`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization,
    },
  }).then(response => (response.status === 200 ? { data: { uuid } } : { error: 'rules.error.delete' }));
};

module.exports = {
  getRules,
  createRule,
  deleteRule,
};
