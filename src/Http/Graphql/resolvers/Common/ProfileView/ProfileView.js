module.exports = {
  fullName({ firstName, lastName }) {
    return [firstName, lastName].filter(v => v).join(' ');
  },
  async acquisition({ uuid }, _, { dataSources }) {
    const response = await dataSources.HierarchyAPI.getUserAcquisition(uuid);

    if (response) {
      return response.acquisition;
    }

    return response;
  },
};
