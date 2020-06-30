const {
  getHierarchyUsers,
  getCustomersSubtree,
  getLeadsSubtree,
  getOperatorsSubtree,
  getPartnersSubtree,
  getUsersByType,
} = require('./hierarchyRequests');

const { getHierarchyMappedOperators } = require('./hierarchyHelpers');

module.exports = {
  helpers: {
    getHierarchyMappedOperators,
  },
  requests: {
    getHierarchyUsers,
    getCustomersSubtree,
    getLeadsSubtree,
    getOperatorsSubtree,
    getPartnersSubtree,
    getUsersByType,
  },
};
