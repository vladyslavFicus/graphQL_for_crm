module.exports = {
  /**
   * Create partner
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise<Partner|*>}
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
   * @return {Promise<Partner|*>}
   */
  async updatePartner(_, args, { dataSources }) {
    await dataSources.AffiliateAPI.updatePartner(args);

    return true;
  },

  /**
   * Change partner account status (close/active)
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Object<{ success: boolean }>}
   */
  async changePartnerAccountStatus(_, args, { dataSources }) {
    await dataSources.AffiliateAPI.changePartnerAccountStatus(args);

    return true;
  },
};
