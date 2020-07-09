module.exports = {
  operator({ parentUser }, _, { dataSources }) {
    return dataSources.OperatorAPI.getByUUID(parentUser);
  },
};
