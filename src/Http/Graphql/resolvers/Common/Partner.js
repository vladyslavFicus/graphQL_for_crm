module.exports = {
  _id({ uuid }) {
    return uuid;
  },
  authorities({ uuid }, _, { dataSources }) {
    return dataSources.Auth2API.getAuthoritiesByUuid(uuid);
  },
  fullName({ firstName, lastName }) {
    return [firstName, lastName].filter(v => v).join(' ');
  },
};
