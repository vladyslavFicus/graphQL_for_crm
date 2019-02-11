const { getOperators: getOperatorsRequest } = require('../../../utils/operatorRequests');

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

module.exports = {
  getOperators,
  getOperator,
};
