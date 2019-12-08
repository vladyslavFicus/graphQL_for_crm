const fetch = require('./fetch');
const buildQueryString = require('./buildQueryString');

const getRules = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/rules-profile/search`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const getRulesRetention = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/rules-payment/?${buildQueryString(args)}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const createRule = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/rules-profile/`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const createRuleRetention = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/rules-payment/`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const deleteRule = (uuid, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/rules-profile/${uuid}`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization,
    },
  }).then(response => (response.status === 200 ? { data: { uuid } } : { error: 'rules.error.delete' }));
};

const deleteRuleRetention = (uuid, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/rules-payment/${uuid}`, {
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
  getRulesRetention,
  createRule,
  createRuleRetention,
  deleteRule,
  deleteRuleRetention,
};
