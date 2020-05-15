module.exports = {
  fullName({ firstName, lastName }) {
    return [firstName, lastName].filter(v => v).join(' ');
  },
  hierarchy({ uuid }, _, { dataSources }) {
    return dataSources.HierarchyAPI.getUser(uuid);
  },
  authorities({ uuid }, _, { dataSources }) {
    return dataSources.AuthAPI.getAuthorities(uuid);
  },
};
