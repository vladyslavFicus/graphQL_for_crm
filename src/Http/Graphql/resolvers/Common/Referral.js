module.exports = {
  async acquisition({ uuid }, _, { dataSources }) {
    const response = await dataSources.HierarchyAPI.getUserAcquisition(uuid);

    if (response) {
      return response.acquisition;
    }

    return response;
  },
};
