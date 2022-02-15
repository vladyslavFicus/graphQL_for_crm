module.exports = {
  operator({ operatorUuid }, _, { dataSources }) {
    return dataSources.OperatorAPI.getByUUID(operatorUuid);
  },
};
