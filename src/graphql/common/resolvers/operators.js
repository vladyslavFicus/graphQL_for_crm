const { get } = require('lodash');
const {
  getOperators: getOperatorsRequest,
  createOperator: createOperatorRequest,
  getOperatorByUUID: getOperatorByUUIDRequest,
  updateOperator: updateOperatorRequest,
} = require('../../../utils/operatorRequests');
const { createUser } = require('../../../utils/hierarchyRequests');
const { addAuthorities, getAuthorities, removeAuthorities } = require('../../../utils/auth');

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

const getOperatorByUUID = async (_, { uuid }, { headers: { authorization } }) =>
  getOperatorByUUIDRequest(uuid, authorization);

const operatorPolling = async (uuid, authorization, attempt = 0) => {
  const response = await getOperatorByUUIDRequest(uuid, authorization);

  // Return error if polling attempting overflow
  if (attempt > 10) {
    Logger.error({ uuid }, 'operator creation polling failed');

    return { error: 'polling failed' };
  }

  // Polling if operator is not created yet
  if (!get(response, 'data.uuid')) {
    Logger.info({ uuid, attempt: attempt + 1 }, 'operator creation polling again');

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(operatorPolling(uuid, authorization, attempt + 1));
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

  const createdOperator = await operatorPolling(uuid, authorization);

  if (createdOperator.error) return createdOperator;

  const authorities = await addAuthorities({ uuid, brandId, department, role }, authorization);

  if (authorities.error) return { data: operator.data, error: authorities.error };

  const userHierarchy = await createUser(
    {
      uuid,
      userType,
      ...(branchId && { parentBranches: [branchId] }),
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

module.exports = {
  addDepartment,
  removeDepartment,
  getOperators,
  getOperatorByUUID,
  createOperator,
  updateOperator,
  getOperator,
};
