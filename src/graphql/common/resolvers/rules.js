const {
  getRules: getRulesQuery,
  getRulesRetention: getRulesRetentionQuery,
  createRule: createRuleQuery,
  createRuleRetention: createRuleRetentionQuery,
  deleteRule: deleteRuleQuery,
  deleteRuleRetention: deleteRuleRetentionQuery,
} = require('../../../utils/rulesRequests');

const getRules = async (_, args, { headers: { authorization }, brand: { id: brandId } }) => {
  return await getRulesQuery({ brandId, ...args }, authorization);
};

const getRulesRetention = async (_, args, { headers: { authorization }, brand: { id: brandId } }) => {
  return await getRulesRetentionQuery({ brandId, ...args }, authorization);
};

const createRule = async (_, args, { headers: { authorization }, brand: { id: brandId } }) => {
  return await createRuleQuery({ brandId, ...args }, authorization);
};

const createRuleRetention = async (_, args, { headers: { authorization }, brand: { id: brandId } }) => {
  return await createRuleRetentionQuery({ brandId, ...args }, authorization);
};

const deleteRule = async (_, { uuid }, { headers: { authorization } }) => {
  const { data, error } = await deleteRuleQuery(uuid, authorization);

  if (error) {
    return { error };
  }

  return { data };
};

const deleteRuleRetention = async (_, { uuid }, { headers: { authorization } }) => {
  const { data, error } = await deleteRuleRetentionQuery(uuid, authorization);

  if (error) {
    return { error };
  }

  return { data };
};

module.exports = {
  getRules,
  getRulesRetention,
  createRule,
  createRuleRetention,
  deleteRule,
  deleteRuleRetention,
};
