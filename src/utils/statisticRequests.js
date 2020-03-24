const fetch = require('./fetch');

const getRegisteredUsersStatistic = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/profileview/admin/profiles/statistics/registration`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

module.exports = {
  getRegisteredUsersStatistic,
};
