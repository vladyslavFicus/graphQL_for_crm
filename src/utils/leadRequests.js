const fetch = require('./fetch');
const parseJson = require('./parseJson');

const getLeads = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_lead_updater/search`, {
    method: 'POST',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
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

const bulkUpdateLead = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_lead/bulk`, {
    method: 'PUT',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => response);
};

module.exports = {
  getLeads,
  getLeadById,
  updateLead,
  bulkUpdateLead,
};
