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
  createSchedule(_, args, { dataSources }) {
    return dataSources.AffiliateAPI.createSchedule(args);
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
  changeScheduleStatus(_, args, { dataSources }) {
    return dataSources.AffiliateAPI.changeScheduleStatus(args);
  },
};
