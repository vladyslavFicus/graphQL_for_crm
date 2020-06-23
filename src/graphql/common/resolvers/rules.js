const {
  getRulesRetention: getRulesRetentionQuery,
  createRule: createRuleQuery,
  createRuleRetention: createRuleRetentionQuery,
  deleteRule: deleteRuleQuery,
  deleteRuleRetention: deleteRuleRetentionQuery,
} = require('../../../utils/rulesRequests');

const createRule = async (_, args, { headers: { authorization }, brand: { id: brandId, userUUID } }) => {
  return await createRuleQuery({ ...args, brandId, createdBy: userUUID }, authorization);
};

const createRuleRetention = async (_, args, { headers: { authorization }, brand: { id: brandId, userUUID } }) => {
  return await createRuleRetentionQuery({ ...args, brandId, userUUID }, authorization);
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
  createRule,
  createRuleRetention,
  deleteRule,
  deleteRuleRetention,
};
