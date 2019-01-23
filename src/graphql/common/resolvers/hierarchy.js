const { groupBy, isEmpty } = require('lodash');
const { branchTypes, userTypes } = require('../../../constants/hierarchy');
const {
  buildRequestObject,
  multipleRequest,
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
  updateUserHierarchy,
} = require('../../../utils/hierarchyRequests');
const { getOperatorFromCache } = require('../../../utils/operatorUtils');

const getHierarchyMappedOperators = async (hierarchyOperators, auth) => {
  const operators = await Promise.all(hierarchyOperators.map(({ uuid }) => getOperatorFromCache(uuid, auth)));

  return hierarchyOperators
    .map((item, index) => {
      const { firstName, lastName, error } = operators[index];

      if (isEmpty(operators[index]) || error) {
        return null;
      }

      return { ...item, fullName: [firstName, lastName].filter(v => v).join(' ') };
    })
    .filter(item => item);
};

const createUser = async (_, { userId, branchId, userType }, { headers: { authorization } }) => {
  const user = await createUserMutation(
    {
      uuid: userId,
      userType,
      ...(branchId && { parentBranches: [branchId] }),
    },
    authorization
  );

  return user;
};

const createOffice = async (_, { officeManager, ...args }, { headers: { authorization }, userUUID: operatorId }) => {
  const successMessages = [];
  const errorMessages = [];
  const office = await createBranch(
    {
      branchType: branchTypes.OFFICE,
      ...args,
    },
    authorization
  );

  if (office.error) {
    errorMessages.push('hierarchy.offices.fail.createOffice');

    return { error: errorMessages };
  }

  successMessages.push('hierarchy.offices.success.createOffice');

  const updateManagerParams = {
    operatorId: officeManager,
    assignToBranch: office.uuid,
  };
  const updateOperatorParams = {
    operatorId,
    assignToBranch: office.uuid,
  };

  const { succeed, errors } = await multipleRequest([
    buildRequestObject(
      updateUserHierarchy(updateManagerParams, authorization),
      'hierarchy.offices.success.updateOfficeManager',
      'hierarchy.offices.fail.updateOfficeManager'
    ),
    buildRequestObject(
      updateUserHierarchy(updateOperatorParams, authorization),
      'hierarchy.offices.success.updateOperator',
      'hierarchy.offices.fail.updateOperator'
    ),
  ]);

  return { data: [...successMessages, ...succeed], error: [...errorMessages, ...errors] };
};

const createDesk = async (_, { officeId, ...args }, { headers: { authorization }, userUUID: operatorId }) => {
  const successMessages = [];
  const errorMessages = [];
  const desk = await createBranch(
    {
      branchType: branchTypes.DESK,
      parentBranches: [officeId],
      ...args,
    },
    authorization
  );

  if (desk.error) {
    errorMessages.push('hierarchy.desks.fail.createDesk');

    return { error: errorMessages };
  }

  successMessages.push('hierarchy.desks.success.createDesk');

  const updateOperatorParams = {
    operatorId,
    assignToBranch: desk.uuid,
  };

  const { succeed, errors } = await multipleRequest([
    buildRequestObject(
      updateUserHierarchy(updateOperatorParams, authorization),
      'hierarchy.desks.success.updateOperator',
      'hierarchy.desks.fail.updateOperator'
    ),
  ]);

  return { data: [...successMessages, ...succeed], error: [...errorMessages, ...errors] };
};

const createTeam = async (_, { deskId, ...args }, { headers: { authorization }, userUUID: operatorId }) => {
  const successMessages = [];
  const errorMessages = [];
  const team = await createBranch(
    {
      branchType: branchTypes.TEAM,
      parentBranches: [deskId],
      ...args,
    },
    authorization
  );

  if (team.error) {
    errorMessages.push('hierarchy.teams.fail.createTeam');

    return { error: errorMessages };
  }

  successMessages.push('hierarchy.teams.success.createTeam');
  const updateOperatorParams = {
    operatorId,
    assignToBranch: team.uuid,
  };

  const { succeed, errors } = await multipleRequest([
    buildRequestObject(
      updateUserHierarchy(updateOperatorParams, authorization),
      'hierarchy.teams.success.updateOperator',
      'hierarchy.teams.fail.updateOperator'
    ),
  ]);

  return { data: [...successMessages, ...succeed], error: [...errorMessages, ...errors] };
};

const addOperatorToBranch = async (_, { operatorId, branchId }, { headers: { authorization } }) => {
  const requestParams = {
    operatorId,
    assignToBranch: branchId,
  };
  const request = await updateUserHierarchy(requestParams, authorization);

  if (request.error) {
    return request;
  }

  return { data: true };
};

const updateHierarchyUser = (_, args, { headers: { authorization } }) => {
  return updateUserHierarchy(args, authorization);
};

const getUserBranchHierarchy = async (_, { userId }, { headers: { authorization } }) => {
  const hierarchy = await getUserBranchHierarchyQuery(userId, authorization);

  if (hierarchy.error) {
    return hierarchy;
  }

  const hierarchyByBranch = groupBy(hierarchy.data, 'branchType');
  return { data: hierarchyByBranch };
};

const getUsersByType = async (_, { userTypes }, { headers: { authorization }, hierarchy }) => {
  const users = await getUsersByTypeQuery(userTypes, authorization);

  if (users.error) {
    return users;
  }

  const visibleUsers = await hierarchy.getOperatorsIds();
  const hierarchyUsers = users.data.filter(({ uuid }) => visibleUsers.includes(uuid));
  const mappedUsers = await getHierarchyMappedOperators(hierarchyUsers, authorization);

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

const getOperator = ({ uuid }, _, { headers: { authorization } }) => {
  return getOperatorFromCache(uuid, authorization);
};

const getUserHierarchy = (_, __, { headers: { authorization }, userUUID }) => {
  return getHierarchyUser(userUUID, authorization);
};

const getUserHierarchyById = (_, { userId }, { headers: { authorization } }) => {
  return getHierarchyUser(userId, authorization);
};

const getUsersByBranch = async (_, { uuid }, { headers: { authorization } }) => {
  const users = await getUsersByBranchQuery(uuid, authorization);

  if (users.error) {
    return users;
  }

  const mappedUsers = await getHierarchyMappedOperators(users.data, authorization);

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
  getOperator,
};
