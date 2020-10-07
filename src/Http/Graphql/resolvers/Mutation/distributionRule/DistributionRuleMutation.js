module.exports = {
  /**
   * Start migration
   *
   * @param _
   * @param uuid
   * @param dataSources
   *
   * @return {Promise}
   */
  async migration(_, { uuid }, { dataSources }) {
    await dataSources.DistributionRuleAPI.migration(uuid);
  },
};
