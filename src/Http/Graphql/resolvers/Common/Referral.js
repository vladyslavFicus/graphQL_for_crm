module.exports = {
  async acquisition({ referralInfo: { profileUuid } }, _, { dataSources }) {
    const response = await dataSources.HierarchyAPI.getUserAcquisition(profileUuid);

    if (response) {
      return response.acquisition;
    }

    return response;
  },
};
