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
   * Update partners status
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async bulkChangeAffiliatesStatus(_, args, { dataSources }) {
    await dataSources.AffiliateAPI.bulkChangeAffiliatesStatus(args);
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

  /**
   * Create schedule
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {*}
   */
  async createSchedule(_, args, { dataSources }) {
    await dataSources.AffiliateAPI.createSchedule(args);
  },

  /**
   * Change schedule status
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async changeScheduleStatus(_, args, { dataSources }) {
    await dataSources.AffiliateAPI.changeScheduleStatus(args);
  },
};
