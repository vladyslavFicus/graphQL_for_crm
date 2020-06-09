const fetch = require('../fetch');
const getBaseUrl = require('../getBaseUrl');

const getPaymentsStatistics = (data, authorization) => {
  return fetch(`${getBaseUrl('payment')}/statistics`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(response => response.json());
};

module.exports = {
  getPaymentsStatistics,
};
