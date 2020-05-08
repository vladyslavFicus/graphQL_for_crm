const config = require('config');
const fetch = require('../../../utils/fetch');

const getTradingActivitiesQuery = (args, authorization) => {
  return fetch(`${config.get('apiUrl')}/trading-activity/`, {
    method: 'POST',
    headers: {
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const getTradingActivities = async (_, args, { headers: { authorization } }) => {
  return await getTradingActivitiesQuery(args, authorization);
};

const changeOriginalAgent = function(_, args, { headers: { authorization } }) {
  return fetch(`${config.get('apiUrl')}/trading-activity/record`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => ({ success: response.status === 200 }));
};

module.exports = {
  getTradingActivities,
  changeOriginalAgent,
};
