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
  updatePartner(_, args, { dataSources }) {
    return dataSources.AffiliateAPI.updatePartner(args);
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
    const responseData = await dataSources.AffiliateAPI.changePartnerAccountStatus(args);
    return { success: !!responseData };
  },
};
