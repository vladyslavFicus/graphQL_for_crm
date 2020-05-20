const fetch = require('../../../utils/fetch');
const getBaseUrl = require('../../../utils/getBaseUrl');

const getRisksQuestionnaire = (_, { clientUuid }, { headers: { authorization } }) => {
  return fetch(`${getBaseUrl('risk-calculator')}/profile-data/${clientUuid}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      authorization,
      'Content-Type': 'application/json',
    },
  }).then(response => response.json());
};

const calculateRisk = (_, args, { headers: { authorization } }) => {
  return fetch(`${getBaseUrl('risk-calculator')}/profile-data`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const saveRiskData = (_, args, { headers: { authorization } }) => {
  return fetch(`${getBaseUrl('risk-calculator')}/profile-data`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

module.exports = {
  getRisksQuestionnaire,
  calculateRisk,
  saveRiskData,
};
