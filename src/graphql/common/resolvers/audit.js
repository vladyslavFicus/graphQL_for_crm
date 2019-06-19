const fetch = require('../../../utils/fetch');
const { getOperator } = require('../../common/resolvers/operators');

const getFeeds = function(_, args, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/forex_audit/logs/search`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const getAssignedToOperator = async function(...args) {
  const [source] = args;
  const { type, details } = source;

  if (details && type === 'PROFILE_ASSIGN') {
    source.acquisitionRepresentativeUuid = JSON.parse(details).acquisitionRepresentativeUuid;

    return getOperator('acquisitionRepresentativeUuid')(...args);
  }
};

const getFeedTypes = function(_, { playerUUID }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/forex_audit/logs/${playerUUID}/types`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

module.exports = {
  getFeeds,
  getFeedTypes,
  getAssignedToOperator,
};
