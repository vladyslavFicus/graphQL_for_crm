module.exports = {
  _id({ uuid }) {
    return uuid;
  },
  fullName({ name, surname }) {
    return [name, surname].filter(v => v).join(' ');
  },
  acquisition({ uuid }, _, { dataSources }) {
    return dataSources.HierarchyAPI.getUserAcquisition(uuid);
  },
};
