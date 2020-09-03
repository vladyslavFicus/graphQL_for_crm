module.exports = {
  _id({ uuid }) {
    return uuid;
  },
  authorities({ uuid }, { brand }, { dataSources, brand: { id } }) {
    // Filter authorities by current brand or by specified brand
    return dataSources.Auth2API.getAuthoritiesByUuid(uuid, brand || id);
  },
  fullName({ firstName, lastName }) {
    return [firstName, lastName].filter(v => v).join(' ');
  },
  hierarchy({ uuid }, _, { dataSources }) {
    return dataSources.HierarchyAPI.getUser(uuid);
  },
};
