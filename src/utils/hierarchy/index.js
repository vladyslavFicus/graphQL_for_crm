const {
  getHierarchyUsers,
  getHierarchyBranch,
  getCustomersSubtree,
  getLeadsSubtree,
  getOperatorsSubtree,
  getPartnersSubtree,
  getUsersByType,
  getUsersByBranch,
  getBranchChildren,
} = require('./hierarchyRequests');

const { getHierarchyMappedOperators } = require('./hierarchyHelpers');

module.exports = {
  helpers: {
    getHierarchyMappedOperators,
  },
  requests: {
    getHierarchyUsers,
    getHierarchyBranch,
    getCustomersSubtree,
    getLeadsSubtree,
    getOperatorsSubtree,
    getPartnersSubtree,
    getUsersByType,
    getUsersByBranch,
    getBranchChildren,
  },
};
