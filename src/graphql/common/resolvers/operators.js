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
  getOperator,
};
