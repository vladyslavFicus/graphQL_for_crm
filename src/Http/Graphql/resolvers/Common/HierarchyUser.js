module.exports = {
  operator({ uuid }, _, { dataSources }) {
    return dataSources.OperatorAPI.getByUUID(uuid);
  },
};
