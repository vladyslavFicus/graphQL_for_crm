const fetch = require('./fetch');
const parseJson = require('./parseJson');
// const buildQueryString = require('../utils/buildQueryString');

const bulkProfileUpdate = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_profile/bulk`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => response);
};

module.exports = {
  bulkProfileUpdate,
};
