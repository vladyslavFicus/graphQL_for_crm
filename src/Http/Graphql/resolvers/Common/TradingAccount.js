module.exports = {
  operator({ readOnlyUpdatedBy }, _, { dataSources }) {
    return dataSources.OperatorAPI.getByUUID(readOnlyUpdatedBy);
  },
};
