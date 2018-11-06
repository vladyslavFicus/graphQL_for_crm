const {
  getRules: getRulesQuery,
  createRule: createRuleQuery,
  deleteRule: deleteRuleQuery,
} = require('../../../utils/rulesRequests');

const getRules = async (_, args, { headers: { authorization }, brand: { id: brandId } }) => {
  const rules = await getRulesQuery({ brandId, ...args }, authorization);

  if (rules.error || rules.jwtError) {
    return { error: rules };
  }

  return { data: rules };
};

const createRule = async (_, args, { headers: { authorization }, brand: { id: brandId } }) => {
  const newRule = await createRuleQuery({ brandId, ...args }, authorization);

  if (newRule.error || newRule.jwtError) {
    return { error: newRule };
  }

  return { data: newRule };
};

const deleteRule = async (_, { uuid }, { headers: { authorization } }) => {
  const { data, error } = await deleteRuleQuery(uuid, authorization);

  if (error) {
    return { error };
  }

  return { data };
};

module.exports = {
  getRules,
  createRule,
  deleteRule,
};
