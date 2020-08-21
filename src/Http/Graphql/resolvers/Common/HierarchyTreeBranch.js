module.exports = {
  manager({ managerUuid }, _, { dataSources }) {
    return dataSources.OperatorAPI.getByUUID(managerUuid);
  },
};
