module.exports = {
  _id({ uuid }) {
    return uuid;
  },
  salesAgent({ salesAgent }, _, { dataSources }) {
    return salesAgent && dataSources.OperatorAPI.getByUUID(salesAgent);
  },
};
