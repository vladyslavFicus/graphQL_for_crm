const parseJson = require('../../../utils/parseJson');
const buildQueryString = require('../../../utils/buildQueryString');
const fetch = require('../../../utils/fetch');

const getDailyPayments = function(_, args, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/reconciliation/payment/daily?${buildQueryString(args)}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response));
};

module.exports = {
  getDailyPayments,
};
