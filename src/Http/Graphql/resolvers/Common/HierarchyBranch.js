module.exports = {
  operators({ managers }, _, { dataSources }) {
    return dataSources.OperatorAPI.getByUUIDs(managers);
  },
};
