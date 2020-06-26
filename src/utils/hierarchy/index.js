const {
  createBranch,
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
  getBrand,
  updateUserBranches,
  updateHierarchyUser,
} = require('./hierarchyRequests');

const { getHierarchyMappedOperators } = require('./hierarchyHelpers');

module.exports = {
  helpers: {
    getHierarchyMappedOperators,
  },
  requests: {
    createBranch,
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
    getBrand,
    updateUserBranches,
    updateHierarchyUser,
  },
};
