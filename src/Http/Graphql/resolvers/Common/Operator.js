module.exports = {
  authorities({ uuid }, _, { dataSources }) {
    return dataSources.Auth2API.getAuthoritiesByUuid(uuid);
  },
  fullName({ firstName, lastName }) {
    return [firstName, lastName].filter(v => v).join(' ');
  },
  hierarchy({ uuid }, _, { dataSources }) {
    return dataSources.HierarchyAPI.getUser(uuid);
  },
};
