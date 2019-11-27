const { isEmpty } = require('lodash');

const getHierarchyMappedOperators = async (hierarchyOperators, dataloaders, onlyActive) => {
  const operatorsType = onlyActive ? 'activeOperators' : 'operators';
  const operators = await Promise.all(hierarchyOperators.map(({ uuid }) => dataloaders[operatorsType].load(uuid)));

  return hierarchyOperators
    .map((item, index) => {
      const { firstName, lastName, operatorStatus, error } = operators[index] || {};

      if (isEmpty(operators[index]) || error) {
        return null;
      }

      return { ...item, operatorStatus, fullName: [firstName, lastName].filter(v => v).join(' ') };
    })
    .filter(item => item);
};

module.exports = {
  getHierarchyMappedOperators,
};
