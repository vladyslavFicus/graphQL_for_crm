const { get } = require('lodash');
const {
  getOperators: getOperatorsRequest,
  createOperator: createOperatorRequest,
  getOperatorByUUID: getOperatorByUUIDRequest,
  updateOperator: updateOperatorRequest,
} = require('../../../utils/operatorRequests');
const {
  requests: { createUser },
} = require('../../../utils/hierarchy');
const { addAuthorities, getAuthorities, removeAuthorities } = require('../../../utils/auth');
const Logger = require('../../../utils/logger');
const { addOperatorToBranch } = require('./hierarchy');

const getOperators = async (_, args, { headers: { authorization }, hierarchy }) => {
  // Hack: Get all operators and then filter it by hierarchy
  const _args = { ...args, size: 2000 };

  const operators = await getOperatorsRequest(_args, authorization);

  if (operators.error) {
    return operators;
  }

  const operatorsIds = await hierarchy.getOperatorsIds();

  const filteredOperators = operators.data.content.filter(operator => operatorsIds.includes(operator.uuid));

  return { data: { ...operators.data, content: filteredOperators, totalElements: filteredOperators.length } };
};

const getOperatorByUUID = async (_, { uuid }, { headers: { authorization }, hierarchy }) => {
  const operatorIds = await hierarchy.getOperatorsIds();

  if (!operatorIds.includes(uuid)) {
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

const createOperator = async (_, args, { headers: { authorization }, brand: { id: brandId } }) => {
  const { department, role, userType, branchId } = args;

  const operator = await createOperatorRequest(args, authorization);
  const uuid = get(operator, 'data.uuid');

  if (operator.error) return operator;

  await authoritiesPolling(uuid, authorization);
  const authorities = await addAuthorities({ uuid, brandId, department, role }, authorization);

  if (authorities.error) return { data: operator.data, error: authorities.error };

  const userHierarchy = await createUser(
    {
      uuid,
      userType,
      parentBranch: branchId,
    },
    authorization
  );

  if (userHierarchy.error) return { data: operator.data, error: userHierarchy.error };

  return operator;
};

const updateOperator = (_, args, { headers: { authorization } }) => updateOperatorRequest(args, authorization);

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

const removeDepartment = async (_, args, { headers: { authorization }, brand: { id: brandId } }) => {
  const removedAuthorities = await removeAuthorities({ ...args, brandId }, authorization);
  const authorities = await getAuthorities(args.uuid, authorization);

  return {
    data: {
      authorities: authorities.data,
    },
    error: removedAuthorities.error || authorities.error,
  };
};

const addDepartment = async (_, args, { headers: { authorization }, brand: { id: brandId } }) => {
  const addedAuthorities = await addAuthorities({ ...args, brandId }, authorization);
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
};
