const { groupBy, isEmpty } = require('lodash');
const { branchTypes, userTypes } = require('../../../constants/hierarchy');
const {
  buildRequestObject,
  multipleRequest,
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

  if (request.error || request.jwtError) {
    return { error: request };
  }

  return { data: true };
};

const getUserBranchHierarchy = async (_, { userId }, { headers: { authorization } }) => {
  const hierarchy = await getUserBranchHierarchyQuery(userId, authorization);

  if (hierarchy.error || hierarchy.jwtError) {
    return { error: hierarchy };
  }

  const hierarchyByBranch = groupBy(hierarchy, 'branchType');

  return { data: hierarchyByBranch };
};

const getUsersByType = async (_, { userTypes }, { headers: { authorization } }) => {
  const users = await getUsersByTypeQuery(userTypes, authorization);

  if (users.error || users.jwtError) {
    return { error: users };
  }

  const mappedUsers = await getHierarchyMappedOperators(users, authorization);

  return { data: groupBy(mappedUsers, 'userType') };
};

const getBranchInfo = async (_, { branchId }, { headers: { authorization } }) => {
  const branch = await getHierarchyBranch(branchId, authorization);

  if (branch.error || branch.jwtError) {
    return { error: branch };
  }

  return { data: branch };
};

const getBranchHierarchy = async (_, args, { headers: { authorization } }) => {
  const hierarchy = await getBranchHierarchyQuery(args, authorization);

  if (hierarchy.error || hierarchy.jwtError) {
    return { error: hierarchy };
  }

  return { data: hierarchy };
};

const getBranchHierarchyTree = async (_, { branchUUID }, { headers: { authorization } }) => {
  const data = await getBranchHierarchyTreeQuery(branchUUID, authorization);

  if (data.error || data.jwtError) {
    return { error: data };
  }

  return { data };
};

const getOperator = ({ uuid }, _, { headers: { authorization } }) => {
  return getOperatorFromCache(uuid, authorization);
};

const getUserHierarchy = async (_, __, { headers: { authorization }, userUUID }) => {
  const data = await getHierarchyUser(userUUID, authorization);

  if (data.error || data.jwtError) {
    return { error: data };
  }

  return { data };
};

const getUsersByBranch = async (_, { uuid }, { headers: { authorization } }) => {
  const users = await getUsersByBranchQuery(uuid, authorization);

  if (users.error || users.jwtError) {
    return { error: users };
  }

  const mappedUsers = await getHierarchyMappedOperators(users, authorization);

  return {
    data: mappedUsers.filter(({ userType }) => [userTypes.CUSTOMER, userTypes.LEAD_CUSTOMER].indexOf(userType) === -1),
  };
};

const getBranchChildren = async (_, { uuid }, { headers: { authorization } }) => {
  const data = await getBranchChildrenQuery(uuid, authorization);

  if (data.error || data.jwtError) {
    return { error: data };
  }

  return {
    data,
  };
};

module.exports = {
  createOffice,
  createDesk,
  createTeam,
  addOperatorToBranch,
  getUserHierarchy,
  getUserBranchHierarchy,
  getUsersByType,
  getBranchInfo,
  getBranchHierarchy,
  getBranchHierarchyTree,
  getUsersByBranch,
  getBranchChildren,
  getOperator,
};
