module.exports = {
  partner({ uuid }, _, { dataSources }) {
    return dataSources.AffiliateAPI.getPartner(uuid);
  },
};
