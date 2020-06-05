module.exports = {
  authorities({ uuid }, _, { dataSources }) {
    return dataSources.AuthAPI.getAuthorities(uuid);
  },
  fullName({ firstName, lastName }) {
    return [firstName, lastName].filter(v => v).join(' ');
  },
  hierarchy({ uuid }, _, { dataSources }) {
    return dataSources.HierarchyAPI.getUser(uuid);
  },
};
