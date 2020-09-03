module.exports = {
  fullName({ firstName, lastName }) {
    return [firstName, lastName].filter(v => v).join(' ');
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
