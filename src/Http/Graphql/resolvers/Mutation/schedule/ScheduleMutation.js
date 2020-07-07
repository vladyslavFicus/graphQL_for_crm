module.exports = {
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
