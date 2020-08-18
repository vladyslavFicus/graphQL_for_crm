module.exports = {
  acquisition({ referralInfo: { profileUuid } }, _, { dataSources }) {
    return profileUuid && dataSources.HierarchyAPI.getUserAcquisition(profileUuid);
  },
};
