module.exports = {
  acquisition({ referralInfo: { profileUuid } }, _, { dataSources }) {
    return dataSources.HierarchyAPI.getUserAcquisition(profileUuid);
  },
};
