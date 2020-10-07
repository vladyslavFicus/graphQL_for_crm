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

  /**
   * Update rule
   *
   * @param _
   * @param uuid
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async updateRule(_, { args: { uuid, ...args } }, { dataSources }) {
    await dataSources.DistributionRuleAPI.updateRule(uuid, args);
  },
};
