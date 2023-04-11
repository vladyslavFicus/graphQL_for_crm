module.exports = {
  operator({ changedBy }, _, { dataSources }) {
    return dataSources.OperatorAPI.getByUUID(changedBy);
  },
};
