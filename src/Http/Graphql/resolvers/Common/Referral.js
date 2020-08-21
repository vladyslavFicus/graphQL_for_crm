module.exports = {
  acquisition({ uuid }, _, { dataSources }) {
    return dataSources.HierarchyAPI.getUserAcquisition(uuid);
  },
};
