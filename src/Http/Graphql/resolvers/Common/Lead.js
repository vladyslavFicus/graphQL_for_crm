module.exports = {
  _id({ uuid }) {
    return uuid;
  },
  async acquisition({ uuid }, _, { dataSources }) {
    const response = await dataSources.HierarchyAPI.getUserAcquisition(uuid);

    if (response) {
      return response.acquisition;
    }

    return response;
  },
};
