const {
  addBranchManager,
  removeBranchManager,
  getHierarchyUser,
  getHierarchyUsers,
  getHierarchyBranch,
  getCustomersSubtree,
  getLeadsSubtree,
  getOperatorsSubtree,
  getPartnersSubtree,
  getUsersByType,
  getBranchHierarchy,
  getBranchHierarchyTree,
  getUsersByBranch,
  getBranchChildren,
  updateUserBranches,
  updateHierarchyUser,
} = require('./hierarchyRequests');

const { getHierarchyMappedOperators } = require('./hierarchyHelpers');

module.exports = {
  helpers: {
    getHierarchyMappedOperators,
  },
  requests: {
    addBranchManager,
    removeBranchManager,
    getHierarchyUser,
    getHierarchyUsers,
    getHierarchyBranch,
    getCustomersSubtree,
    getLeadsSubtree,
    getOperatorsSubtree,
    getPartnersSubtree,
    getUsersByType,
    getBranchHierarchy,
    getBranchHierarchyTree,
    getUsersByBranch,
    getBranchChildren,
    updateUserBranches,
    updateHierarchyUser,
  },
};
