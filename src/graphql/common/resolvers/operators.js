const fetch = require('../../../utils/fetch');
const parseJson = require('../../../utils/parseJson');
const { getOperators: getOperatorsRequest } = require('../../../utils/operatorRequests');
const { userTypes } = require('../../../constants/hierarchy');

const getOperators = async (_, args, { headers: { authorization }, hierarchy }) => {
  // Hack: Get all operators and then filter it by hierarchy
  const _args = { ...args, size: 2000 };

  const operators = await getOperatorsRequest(_args, authorization);

  if (operators.error || operators.jwtError) {
    return { error: operators };
  }

  // HACK: Filter operators by hierarchy if user isn't administration
  if (!hierarchy.isAdministration) {
    const filteredOperators = operators.content.filter(operator => hierarchy.getOperatorsIds().includes(operator.uuid));

    return { data: { ...operators, content: filteredOperators } };
  }

  return { data: operators };
};

module.exports = {
  getOperators,
};
