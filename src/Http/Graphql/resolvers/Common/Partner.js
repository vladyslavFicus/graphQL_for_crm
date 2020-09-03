module.exports = {
  _id({ uuid }) {
    return uuid;
  },
  authorities({ uuid }, _, { dataSources, brand: { id } }) {
    return dataSources.Auth2API.getAuthoritiesByUuid(uuid, id);
  },
  fullName({ firstName, lastName }) {
    return [firstName, lastName].filter(v => v).join(' ');
  },
  schedule({ uuid }, _, { dataSources }) {
    return dataSources.AffiliateAPI.getSchedule(uuid);
  },
};
