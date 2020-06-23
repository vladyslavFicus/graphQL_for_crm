const fetch = require('./fetch');
const getBaseUrl = require('./getBaseUrl');
const buildQueryString = require('./buildQueryString');

const createRule = (args, authorization) => {
  return fetch(`${getBaseUrl('rules-profile')}/`, {
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
  return fetch(`${getBaseUrl('rules-payment')}/`, {
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
  return fetch(`${getBaseUrl('rules-profile')}/${uuid}`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization,
    },
  }).then(response => (response.status === 200 ? { data: { uuid } } : { error: 'rules.error.delete' }));
};

const deleteRuleRetention = (uuid, authorization) => {
  return fetch(`${getBaseUrl('rules-payment')}/${uuid}`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization,
    },
  }).then(response => (response.status === 200 ? { data: { uuid } } : { error: 'rules.error.delete' }));
};

module.exports = {
  createRule,
  createRuleRetention,
  deleteRule,
  deleteRuleRetention,
};
