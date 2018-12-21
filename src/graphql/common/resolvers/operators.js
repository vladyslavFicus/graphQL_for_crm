const { getOperators: getOperatorsRequest } = require('../../../utils/operatorRequests');
const getOperators = async (_, args, { headers: { authorization }, hierarchy }) => {
  // Hack: Get all operators and then filter it by hierarchy
  const _args = { ...args, size: 2000 };

  const operators = await getOperatorsRequest(_args, authorization);

  if (operators.error || operators.jwtError) {
    return { error: operators };
  }

  const filteredOperators = operators.content.filter(operator => hierarchy.getOperatorsIds().includes(operator.uuid));

  return { data: { ...operators, content: filteredOperators } };
};

module.exports = {
  getOperators,
};
