module.exports = {
  async acquisition({ referralInfo: { profileUuid } }, _, { dataSources }) {
    try {
      const { acquisition } = await dataSources.HierarchyAPI.getUserAcquisition(profileUuid);
      return acquisition;
    } catch (e) {
      return null;
    }
  },
};
