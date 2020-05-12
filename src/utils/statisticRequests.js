const config = require('config');
const fetch = require('./fetch');

const getRegisteredUsersStatistic = (args, authorization) => {
  return fetch(`${config.get('apiUrl')}/profileview/admin/profiles/statistics/registration`, {
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
