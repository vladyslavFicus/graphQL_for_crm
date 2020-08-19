module.exports = {
  _id({ uuid }) {
    return uuid;
  },
  acquisition({ uuid }, _, { dataSources }) {
    return dataSources.HierarchyAPI.getUserAcquisition(uuid);
  },
};
