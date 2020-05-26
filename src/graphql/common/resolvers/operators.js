const { get } = require('lodash');
const {
  getOperators: getOperatorsRequest,
  createOperator: createOperatorRequest,
  getOperatorByUUID: getOperatorByUUIDRequest,
  getOperatorsByUUIDs: getOperatorsByUUIDsRequest,
  updateOperator: updateOperatorRequest,
  sendInvitation: sendInvitationRequest,
  changeStatus: changeStatusRequest,
} = require('../../../utils/operatorRequests');
const {
  requests: { createUser },
} = require('../../../utils/hierarchy');
const { addAuthorities, getAuthorities, removeAuthorities } = require('../../../utils/auth');
const Logger = require('../../../utils/logger');
const { addOperatorToBranch } = require('./hierarchy');

const getOperators = async (_, args, { headers: { authorization }, hierarchy }) => {
  const operatorsIds = await hierarchy.getOperatorsIds();

  return getOperatorsByUUIDsRequest(
    {
      ...args,
      uuids: operatorsIds,
      limit: operatorsIds.length,
    },
    authorization
  );
};

const getOperatorByUUID = async (_, { uuid }, { headers: { authorization }, hierarchy }) => {
  const allowed = await hierarchy.checkAccess(uuid);

  if (!allowed) {
    return {
      data: null,
      error: {
        error: 'Not Found',
      },
    };
  }

  return getOperatorByUUIDRequest(uuid, authorization);
};

const authoritiesPolling = async (uuid, authorization, attempt = 0) => {
  const response = await getAuthorities(uuid, authorization);
  // Return error if polling attempting overflow
  if (attempt > 5) {
    Logger.error({ uuid }, 'authorities polling failed');

    return { error: 'polling failed' };
  }

  // Polling if authorities return error
  if (response.error) {
    Logger.info({ uuid, attempt: attempt + 1 }, 'authorities polling again');

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(authoritiesPolling(uuid, authorization, attempt + 1));
      }, 1000);
    });
  }

  return response;
};

const createOperator = async (
  _,
  { branchId, userType, ...args },
  { headers: { authorization }, brand: { id: brandId } }
) => {
  const operator = await createOperatorRequest({ brandId, type: 'OPERATOR', ...args }, authorization);
  const uuid = get(operator, 'data.uuid');

  if (operator.error) return operator;
  const userHierarchy = await createUser(
    {
      uuid,
      userType,
      parentBranch: branchId,
    },
    authorization
  );

  return {
    data: operator.data,
    error: get(userHierarchy, 'error'),
  };
};

const updateOperator = (_, args, { headers: { authorization } }) => updateOperatorRequest(args, authorization);

const sendInvitation = (_, args, { headers: { authorization } }) => sendInvitationRequest(args, authorization);

const changeStatus = (_, args, { headers: { authorization } }) => changeStatusRequest(args, authorization);

/**
 * Retrieve operator depends on source fieldName
 *
 * @param fieldName
 * @return {Function}
 */
const getOperator = fieldName => ({ [fieldName]: operatorId }, _, { dataloaders }) => {
  if (!operatorId) {
    return null;
  }

  return dataloaders.operators.load(operatorId);
};

const removeDepartment = async (_, args, { headers: { authorization }, brand: { id: brand } }) => {
  const removedAuthorities = await removeAuthorities({ ...args, brand }, authorization);
  const authorities = await getAuthorities(args.uuid, authorization);

  return {
    data: {
      authorities: authorities.data,
    },
    error: removedAuthorities.error || authorities.error,
  };
};

const addDepartment = async (_, args, { headers: { authorization }, brand: { id: brand } }) => {
  const addedAuthorities = await addAuthorities({ ...args, brand }, authorization);
  const authorities = await getAuthorities(args.uuid, authorization);

  return {
    data: {
      authorities: authorities.data,
    },
    error: addedAuthorities.error || authorities.error,
  };
};

const addExistingOperator = async (_, { email, department, role, branchId }, context) => {
  const operator = await getOperatorsRequest({ searchBy: email }, context.headers.authorization);
  const {
    data: { content },
    error,
  } = operator;

  if (error) {
    return operator;
  }

  const _addDepartment = await addDepartment(_, { uuid: content[0].uuid, department, role }, context);
  const _addOperatorToBranch = await addOperatorToBranch(_, { operatorId: content[0].uuid, branchId }, context);

  return {
    data: {
      uuid: content[0].uuid,
    },
    error: _addDepartment.error || _addOperatorToBranch.error,
  };
};

module.exports = {
  addDepartment,
  removeDepartment,
  getOperators,
  getOperatorByUUID,
  createOperator,
  updateOperator,
  getOperator,
  addExistingOperator,
  sendInvitation,
  changeStatus,
};
