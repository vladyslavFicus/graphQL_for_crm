const { groupBy, isEmpty } = require('lodash');
const { branchTypes, userTypes } = require('../../../constants/hierarchy');
const {
  requests: {
    createUser: createUserMutation,
    createBranch,
    getHierarchyUser,
    getHierarchyBranch,
    getBranchHierarchyTree: getBranchHierarchyTreeQuery,
    getUserBranchHierarchy: getUserBranchHierarchyQuery,
    getUsersByType: getUsersByTypeQuery,
    getBranchHierarchy: getBranchHierarchyQuery,
    getUsersByBranch: getUsersByBranchQuery,
    getBranchChildren: getBranchChildrenQuery,
    updateUserBranches,
    getBrand,
  },
  helpers: { getHierarchyMappedOperators, buildRequestObject, multipleRequest },
} = require('../../../utils/hierarchy');

const createUser = (_, { userId, branchId, userType }, { headers: { authorization } }) => {
  return createUserMutation(
    {
      uuid: userId,
      userType,
      parentBranch: branchId,
    },
    authorization
  );
};

const createOffice = async (_, { officeManager, ...args }, { headers: { authorization }, brand: { id: brandId } }) => {
  const successMessages = [];
  const errorMessages = [];

  const { data, error } = await getBrand(brandId, authorization);

  if (!data || error) {
    errorMessages.push('hierarchy.offices.fail.createOffice');

    return { error: errorMessages, data: [] };
  }

  const office = await createBranch(
    {
      branchType: branchTypes.OFFICE,
      parentBranch: data.uuid,
      ...args,
    },
    authorization
  );

  if (office.error) {
    errorMessages.push('hierarchy.offices.fail.createOffice');

    return { error: errorMessages, data: [] };
  }

  successMessages.push('hierarchy.offices.success.createOffice');

  return { data: successMessages, error: errorMessages };
};

const createDesk = async (_, { officeId, ...args }, { headers: { authorization } }) => {
  const successMessages = [];
  const errorMessages = [];
  const desk = await createBranch(
    {
      branchType: branchTypes.DESK,
      parentBranch: officeId,
      ...args,
    },
    authorization
  );

  if (desk.error) {
    errorMessages.push('hierarchy.desks.fail.createDesk');

    return { error: errorMessages };
  }

  successMessages.push('hierarchy.desks.success.createDesk');

  return { data: successMessages, error: errorMessages };
};

const createTeam = async (_, { deskId, ...args }, { headers: { authorization } }) => {
  const successMessages = [];
  const errorMessages = [];
  const team = await createBranch(
    {
      branchType: branchTypes.TEAM,
      parentBranch: deskId,
      ...args,
    },
    authorization
  );

  if (team.error) {
    errorMessages.push('hierarchy.teams.fail.createTeam');

    return { error: errorMessages };
  }

  successMessages.push('hierarchy.teams.success.createTeam');

  return { data: successMessages, error: errorMessages };
};

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

const updateHierarchyUser = (_, args, { headers: { authorization } }) => {
  return updateUserBranches(args, authorization);
};

const getUserBranchHierarchy = async (
  _,
  { userId, withoutBrandFilter },
  { headers: { authorization }, brand: { id: brandId } }
) => {
  const _brandId = withoutBrandFilter ? '' : brandId;
  const hierarchy = await getUserBranchHierarchyQuery(userId, authorization, _brandId);

  if (hierarchy.error) {
    return hierarchy;
  }

  const hierarchyByBranch = groupBy(hierarchy.data, 'branchType');
  return { data: hierarchyByBranch };
};

const getUsersByType = async (_, { userTypes, onlyActive }, { headers: { authorization }, hierarchy, dataloaders }) => {
  const users = await getUsersByTypeQuery(userTypes, authorization);

  if (users.error) {
    return users;
  }

  const visibleUsers = await hierarchy.getOperatorsIds();
  const hierarchyUsers = users.data.filter(({ uuid }) => visibleUsers.includes(uuid));
  const mappedUsers = await getHierarchyMappedOperators(hierarchyUsers, dataloaders, onlyActive);

  return { data: groupBy(mappedUsers, 'userType') };
};

const getBranchInfo = (_, { branchId }, { headers: { authorization } }) => {
  return getHierarchyBranch(branchId, authorization);
};

const getBranchHierarchy = (_, args, { headers: { authorization } }) => {
  return getBranchHierarchyQuery(args, authorization);
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

const getUsersByBranch = async (_, { uuid, onlyActive }, { headers: { authorization }, dataloaders }) => {
  const users = await getUsersByBranchQuery(uuid, authorization);

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
  createUser,
  createOffice,
  createDesk,
  createTeam,
  addOperatorToBranch,
  updateHierarchyUser,
  getUserHierarchy,
  getUserHierarchyById,
  getUserBranchHierarchy,
  getUsersByType,
  getBranchInfo,
  getBranchHierarchy,
  getBranchHierarchyTree,
  getUsersByBranch,
  getBranchChildren,
};
