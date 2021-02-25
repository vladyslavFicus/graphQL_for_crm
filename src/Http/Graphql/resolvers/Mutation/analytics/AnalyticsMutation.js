module.exports = {
  /**
   * Track analytics events
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise<*>}
   */
  async track(_, { args }, { dataSources }) {
    await dataSources.AnalyticsAPI.track(args);
  },
};
