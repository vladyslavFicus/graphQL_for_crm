module.exports = {
  fullName({ firstName, lastName }) {
    return [firstName, lastName].filter(v => v).join(' ');
  },
  acquisition({ uuid }, _, { dataSources }) {
    return uuid && dataSources.HierarchyAPI.getUserAcquisition(uuid);
  },
};
