module.exports = {
  originalAgent({ agentId }, _, { dataSources }) {
    return dataSources.OperatorAPI.getByUUID(agentId);
  },
};
