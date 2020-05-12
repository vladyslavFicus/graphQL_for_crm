const config = require('config');
const fetch = require('../../../utils/fetch');
const { getOperator } = require('../../common/resolvers/operators');

const getFeeds = function(_, args, { headers: { authorization } }) {
  return fetch(`${config.get('apiUrl')}/audit/logs/search`, {
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
  return fetch(`${config.get('apiUrl')}/audit/logs/${playerUUID}/types`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getDetails = async function(...args) {
  const [source] = args;
  const { type, details } = source;

  if (details && type === 'PROFILE_ASSIGN') {
    const parsedDetails = JSON.parse(details);
    source.acquisitionRepresentativeUuid = parsedDetails.acquisitionRepresentativeUuid;
    const { firstName, lastName } = await getOperator('acquisitionRepresentativeUuid')(...args);
    parsedDetails.assignedToName = `${firstName} ${lastName}`;
    return JSON.stringify(parsedDetails);
  }

  return details;
};

const geAuthorFullName = async (...args) => {
  const [source] = args;
  const { authorUuid, authorFullName } = source;

  if (authorUuid === 'SYSTEM') {
    return 'System';
  }

  const prefix = authorUuid.split('-')[0];

  switch (prefix) {
    case 'OPERATOR':
      const { firstName, lastName } = await getOperator('authorUuid')(...args);

      return `${firstName} ${lastName}`;
    case 'RULE':
      return 'System';

    default:
      return authorFullName;
  }
};

module.exports = {
  getFeeds,
  getDetails,
  getFeedTypes,
  geAuthorFullName,
  getAssignedToOperator,
};
