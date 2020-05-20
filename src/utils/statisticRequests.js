const fetch = require('./fetch');
const getBaseUrl = require('./getBaseUrl');

const getRegisteredUsersStatistic = (args, authorization) => {
  return fetch(`${getBaseUrl('profileview')}/admin/profiles/statistics/registration`, {
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
