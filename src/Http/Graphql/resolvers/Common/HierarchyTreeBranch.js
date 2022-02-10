module.exports = {
  managers({ managerUuids }, _, { dataSources }) {
    return dataSources.OperatorAPI.getByUUIDs(managerUuids);
  },
};
