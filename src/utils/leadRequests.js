const fetch = require('./fetch');
const parseJson = require('./parseJson');
const buildQueryString = require('./buildQueryString');

const getLeads = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_lead_updater/search?${buildQueryString(args, true)}`, {
    method: 'GET',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => response);
};

const getLeadById = (leadId, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_lead_updater/${leadId}`, {
    method: 'GET',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => response);
};

const updateLead = ({ id, ...args }, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_lead/lead/${id}`, {
    method: 'PUT',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(async response => {
    const data = await response.text();
    return { status: response.status, data: parseJson(data) };
  });
};

module.exports = {
  getLeads,
  getLeadById,
  updateLead,
};
