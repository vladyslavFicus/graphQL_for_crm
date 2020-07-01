module.exports = {
  /**
   * Create partner
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  createPartner(_, args, { dataSources }) {
    return dataSources.AffiliateAPI.createPartner(args);
  },

  /**
   * Update partner
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async updatePartner(_, args, { dataSources }) {
    await dataSources.AffiliateAPI.updatePartner(args);
  },

  /**
   * Change partner account status (close/active)
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async changePartnerAccountStatus(_, args, { dataSources }) {
    await dataSources.AffiliateAPI.changePartnerAccountStatus(args);
  },
};
