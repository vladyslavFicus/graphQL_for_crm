module.exports = {
  salesOperator({ salesRepresentative }, _, { dataSources }) {
    return dataSources.OperatorAPI.getByUUID(salesRepresentative);
  },
  retentionOperator({ retentionRepresentative }, _, { dataSources }) {
    return dataSources.OperatorAPI.getByUUID(retentionRepresentative);
  },
};
