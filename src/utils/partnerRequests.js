const fetch = require('./fetch');
const getBaseUrl = require('./getBaseUrl');

const getPartners = (args, authorization) => {
  return fetch(`${getBaseUrl('affiliate')}/affiliates/search`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const getPartnerByUUID = (partnerId, authorization) => {
  return fetch(`${getBaseUrl('affiliate')}/affiliates/${partnerId}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const updatePartner = ({ uuid, ...args }, authorization) => {
  return fetch(`${getBaseUrl('affiliate')}/affiliates/${uuid}`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const createPartner = (args, authorization) => {
  return fetch(`${getBaseUrl('affiliate')}/affiliates`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const changeStatus = ({ uuid, ...args }, authorization) => {
  return fetch(`${getBaseUrl('affiliate')}/affiliates/${uuid}/status`, {
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
  changeStatus,
  createPartner,
  updatePartner,
  getPartnerByUUID,
  getPartners,
};
