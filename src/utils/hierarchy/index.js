const {
  getHierarchyUsers,
  getCustomersSubtree,
  getLeadsSubtree,
  getOperatorsSubtree,
  getPartnersSubtree,
  getUsersByType,
  getBranchChildren,
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
    getBranchChildren,
  },
};
