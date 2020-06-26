const { groupBy } = require('lodash');
const { userTypes } = require('../../../constants/hierarchy');
const {
  requests: {
    getHierarchyUser,
    getHierarchyBranch,
    getBranchHierarchyTree: getBranchHierarchyTreeQuery,
    getUsersByType: getUsersByTypeQuery,
    getBranchHierarchy: getBranchHierarchyQuery,
    getUsersByBranch: getUsersByBranchQuery,
    getBranchChildren: getBranchChildrenQuery,
    updateUserBranches,
    updateHierarchyUser: updateHierarchyUserRequest,
    addBranchManager: addBranchManagerRequest,
    removeBranchManager: removeBranchManagerRequest,
  },
  helpers: { getHierarchyMappedOperators },
} = require('../../../utils/hierarchy');

const addOperatorToBranch = async (_, { operatorId, branchId }, { headers: { authorization } }) => {
  const requestParams = {
    operatorId,
    assignToBranch: branchId,
  };
  const request = await updateUserBranches(requestParams, authorization);

  if (request.error) {
    return request;
  }

  return { data: true };
};

const addBranchManager = async (_, { branchUuid, operatorUuid }, { headers: { authorization } }) => {
  const response = await addBranchManagerRequest({ branchUuid, manager: operatorUuid }, authorization);

  return {
    success: !response.error,
    ...response,
  };
};

const removeBranchManager = async (_, { branchUuid }, { headers: { authorization } }) => {
  return removeBranchManagerRequest(branchUuid, authorization);
};

const removeOperatorFromBranch = async (_, { operatorId, branchId }, { headers: { authorization } }) => {
  const requestParams = {
    operatorId,
    unassignFromBranch: branchId,
  };
  const request = await updateUserBranches(requestParams, authorization);

  if (request.error) {
    return request;
  }

  return { data: true };
};

const updateHierarchyUser = (_, args, { headers: { authorization } }) => {
  return updateHierarchyUserRequest(args, authorization);
};

const getUsersByType = async (_, args, { headers: { authorization }, hierarchy, dataloaders }) => {
  const users = await getUsersByTypeQuery(args.userTypes, authorization);

  if (users.error) {
    return users;
  }

  const visibleUsers = await hierarchy.getOperatorsIds();
  const hierarchyUsers = users.data.filter(({ uuid }) => visibleUsers.includes(uuid));
  const mappedUsers = await getHierarchyMappedOperators(hierarchyUsers, dataloaders, args.onlyActive);

  return { data: groupBy(mappedUsers, 'userType') };
};

const getBranchInfo = (_, { branchId }, { headers: { authorization } }) => {
  return getHierarchyBranch(branchId, authorization);
};

const getBranchHierarchy = (_, args, { headers: { authorization }, userUUID }) => {
  return getBranchHierarchyQuery(args, userUUID, authorization);
};

const getBranchHierarchyTree = (_, { branchUUID }, { headers: { authorization } }) => {
  return getBranchHierarchyTreeQuery(branchUUID, authorization);
};

const getUserHierarchy = (_, __, { headers: { authorization }, userUUID }) => {
  return getHierarchyUser(userUUID, authorization);
};

const getUserHierarchyById = (_, { userId }, { headers: { authorization } }) => {
  return getHierarchyUser(userId, authorization);
};

const getUsersByBranch = async (_, { uuids, onlyActive }, { headers: { authorization }, dataloaders }) => {
  const users = await getUsersByBranchQuery({ uuids }, authorization);

  if (users.error) {
    return users;
  }

  // TODO. CRUTCH: We should use /user/branch/${uuid}/operators query, after it will be implemented
  const operators = users.data.filter(({ uuid }) => uuid.startsWith('OPERATOR'));
  const mappedUsers = await getHierarchyMappedOperators(operators, dataloaders, onlyActive);

  return {
    data: mappedUsers.filter(({ userType }) => [userTypes.CUSTOMER, userTypes.LEAD_CUSTOMER].indexOf(userType) === -1),
  };
};

const getBranchChildren = (_, { uuid }, { headers: { authorization } }) => {
  return getBranchChildrenQuery(uuid, authorization);
};

module.exports = {
  addBranchManager,
  removeBranchManager,
  addOperatorToBranch,
  removeOperatorFromBranch,
  updateHierarchyUser,
  getUserHierarchy,
  getUserHierarchyById,
  getUsersByType,
  getBranchInfo,
  getBranchHierarchy,
  getBranchHierarchyTree,
  getUsersByBranch,
  getBranchChildren,
};
