module.exports = {
  _id({ uuid }) {
    return uuid;
  },
  async acquisition({ uuid }, _, { dataSources }) {
    try {
      const { acquisition } = await dataSources.HierarchyAPI.getUserAcquisition(uuid);
      return acquisition;
    } catch (e) {
      return null;
    }
  },
};
