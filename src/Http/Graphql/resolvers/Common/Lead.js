module.exports = {
  _id({ uuid }) {
    return uuid;
  },
  acquisition({ uuid }, _, { dataSources }) {
    return uuid && dataSources.HierarchyAPI.getUserAcquisition(uuid);
  },
};
