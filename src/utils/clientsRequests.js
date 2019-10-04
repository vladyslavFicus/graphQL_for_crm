const fetch = require('./fetch');

const bulkProfileUpdate = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading-profile/bulk`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

module.exports = {
  bulkProfileUpdate,
};
