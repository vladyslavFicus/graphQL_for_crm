const fetch = require('./fetch');
const getBaseUrl = require('./getBaseUrl');

const getLeads = (args, authorization) => {
  return fetch(`${getBaseUrl('lead')}/v2/leads/search`, {
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
  return fetch(`${getBaseUrl('lead')}/lead/${leadId}`, {
    method: 'GET',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const updateLead = ({ uuid, ...args }, authorization) => {
  return fetch(`${getBaseUrl('lead-updater')}/lead/${uuid}`, {
    method: 'PUT',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const bulkUpdateLead = (args, authorization) => {
  return fetch(`${getBaseUrl('lead-updater')}/bulk/lead/sales-status`, {
    method: 'PUT',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

module.exports = {
  getLeads,
  getLeadById,
  updateLead,
  bulkUpdateLead,
};
