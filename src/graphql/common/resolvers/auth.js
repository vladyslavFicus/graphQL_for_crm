const { getAuthorities: getAuthoritiesRequest } = require('../../../utils/auth');

// # Will be removed after PartnerType and OperatorType will be removed
const getAuthorities = (_, { uuid }, { headers: { authorization } }) => {
  return getAuthoritiesRequest(uuid, authorization);
};

module.exports = { credentials: { getAuthorities } };
