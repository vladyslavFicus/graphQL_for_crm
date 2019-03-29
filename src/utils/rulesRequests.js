const fetch = require('./fetch');
const buildQueryString = require('./buildQueryString');

const getRules = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_rules_profile/?${buildQueryString(args)}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getRulesRetention = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_rules_payment/?${buildQueryString(args)}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
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
  }).then(response => response.json());
};

const createRuleRetention = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_rules_payment/`, {
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
  return fetch(`${global.appConfig.apiUrl}/trading_rules_profile/${uuid}`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization,
    },
  }).then(response => (response.status === 200 ? { data: { uuid } } : { error: 'rules.error.delete' }));
};

const deleteRuleRetention = (uuid, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_rules_payment/${uuid}`, {
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
