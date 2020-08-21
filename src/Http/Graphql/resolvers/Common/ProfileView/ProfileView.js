module.exports = {
  fullName({ firstName, lastName }) {
    return [firstName, lastName].filter(v => v).join(' ');
  },
  acquisition({ uuid }, _, { dataSources }) {
    return dataSources.HierarchyAPI.getUserAcquisition(uuid);
  },
};
