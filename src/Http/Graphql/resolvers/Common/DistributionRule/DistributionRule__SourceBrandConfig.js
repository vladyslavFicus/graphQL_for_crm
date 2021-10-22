module.exports = {
  operatorEntity({ operator }, _, { dataSources }) {
    return dataSources.OperatorAPI.getByUUID(operator);
  },
};
