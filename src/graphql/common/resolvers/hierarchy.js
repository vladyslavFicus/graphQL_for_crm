const { groupBy, isEmpty } = require('lodash');
const { branchTypes, userTypes } = require('../../../constants/hierarchy');
const {
  buildRequestObject,
  multipleRequest,
  createBranch,
  getHierarchyUser,
  getHierarchyBranch,
  getUserBranchHierarchy: getUserBranchHierarchyQuery,
  getUsersByType: getUsersByTypeQuery,
  getBranchHierarchy: getBranchHierarchyQuery,
  getUsersByBranch: getUsersByBranchQuery,
  getBranchChildren: getBranchChildrenQuery,
  updateUserHierarchy,
  updateBranchHierarchy,
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

const createOffice = async (_, { operatorId, officeManager, ...args }, { headers: { authorization } }) => {
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
  const {
    succeed: [manager, operator],
    errors: usersErrors,
  } = await multipleRequest([
    buildRequestObject(
      getHierarchyUser(officeManager, authorization),
      null,
      'hierarchy.offices.fail.updateOfficeManager'
    ),
    buildRequestObject(getHierarchyUser(operatorId, authorization), null, 'hierarchy.offices.fail.updateOperator'),
  ]);

  if (usersErrors.length > 0) {
    return {
      data: successMessages,
      error: [...errorMessages, ...usersErrors],
    };
  }

  const { userType: managerType, parentBranches: managerBranches = [] } = manager;
  const { userType, parentBranches = [] } = operator;
  const updateManagerParams = {
    operatorId: officeManager,
    userType: managerType,
    parentBranches: [...managerBranches, office.uuid],
  };
  const updateOperatorParams = {
    operatorId,
    userType,
    parentBranches: [...parentBranches, office.uuid],
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

const createDesk = async (_, { operatorId, officeId, ...args }, { headers: { authorization } }) => {
  const successMessages = [];
  const errorMessages = [];
  const desk = await createBranch(
    {
      branchType: branchTypes.DESK,
      ...args,
    },
    authorization
  );

  if (desk.error) {
    errorMessages.push('hierarchy.desks.fail.createDesk');

    return { error: errorMessages };
  }

  successMessages.push('hierarchy.desks.success.createDesk');
  const {
    succeed: [deskInfo, operator],
    errors: infoErrors,
  } = await multipleRequest([
    buildRequestObject(getHierarchyBranch(desk.uuid, authorization), null, 'hierarchy.desks.fail.updateDesk'),
    buildRequestObject(getHierarchyUser(operatorId, authorization), null, 'hierarchy.desks.fail.updateOperator'),
  ]);

  if (infoErrors.length > 0) {
    return {
      data: successMessages,
      error: [...errorMessages, ...infoErrors],
    };
  }

  const { userType, parentBranches = [] } = operator;
  const updateOperatorParams = {
    operatorId,
    userType,
    parentBranches: [...parentBranches, deskInfo.uuid],
  };
  const updateDeskParams = {
    ...deskInfo,
    parentBranches: [officeId],
  };

  const { succeed, errors } = await multipleRequest([
    buildRequestObject(
      updateBranchHierarchy(updateDeskParams, authorization),
      'hierarchy.desks.success.updateDesk',
      'hierarchy.desks.fail.updateDesk'
    ),
    buildRequestObject(
      updateUserHierarchy(updateOperatorParams, authorization),
      'hierarchy.desks.success.updateOperator',
      'hierarchy.desks.fail.updateOperator'
    ),
  ]);

  return { data: [...successMessages, ...succeed], error: [...errorMessages, ...errors] };
};

const createTeam = async (_, { operatorId, deskId, ...args }, { headers: { authorization } }) => {
  const successMessages = [];
  const errorMessages = [];
  const team = await createBranch(
    {
      branchType: branchTypes.TEAM,
      ...args,
    },
    authorization
  );

  if (team.error) {
    errorMessages.push('hierarchy.teams.fail.createTeam');

    return { error: errorMessages };
  }

  successMessages.push('hierarchy.teams.success.createTeam');
  const {
    succeed: [teamInfo, operator],
    errors: infoErrors,
  } = await multipleRequest([
    buildRequestObject(getHierarchyBranch(team.uuid, authorization), null, 'hierarchy.teams.fail.updateTeam'),
    buildRequestObject(getHierarchyUser(operatorId, authorization), null, 'hierarchy.teams.fail.updateOperator'),
  ]);

  if (infoErrors.length > 0) {
    return {
      data: successMessages,
      error: [...errorMessages, ...infoErrors],
    };
  }

  const { userType, parentBranches = [] } = operator;
  const updateOperatorParams = {
    operatorId,
    userType,
    parentBranches: [...parentBranches, teamInfo.uuid],
  };
  const updateTeamParams = {
    ...teamInfo,
    parentBranches: [deskId],
  };

  const { succeed, errors } = await multipleRequest([
    buildRequestObject(
      updateBranchHierarchy(updateTeamParams, authorization),
      'hierarchy.teams.success.updateTeam',
      'hierarchy.teams.fail.updateTeam'
    ),
    buildRequestObject(
      updateUserHierarchy(updateOperatorParams, authorization),
      'hierarchy.teams.success.updateOperator',
      'hierarchy.teams.fail.updateOperator'
    ),
  ]);

  return { data: [...successMessages, ...succeed], error: [...errorMessages, ...errors] };
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
  getUserBranchHierarchy,
  getUsersByType,
  getBranchInfo,
  getBranchHierarchy,
  getUsersByBranch,
  getBranchChildren,
};
