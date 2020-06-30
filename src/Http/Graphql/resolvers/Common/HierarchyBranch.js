module.exports = {
  operator({ manager }, _, { dataSources }) {
    return dataSources.OperatorAPI.getByUUID(manager);
  },
};
