module.exports = {
  partners({ affiliateUUIDs }, _, { dataSources }) {
    return affiliateUUIDs.map(uuid => dataSources.AffiliateAPI.getPartner(uuid));
  },
};
