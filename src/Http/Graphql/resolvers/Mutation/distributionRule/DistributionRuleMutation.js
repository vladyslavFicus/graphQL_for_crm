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
  async distributionRuleMigration(_, { uuid }, { dataSources }) {
    await dataSources.DistributionRuleAPI.distributionRuleMigration(uuid);
  },

  /**
   * Get clients amount
   *
   * @param _
   * @param uuid
   * @param dataSources
   *
   * @return {Promise}
   */
  distributionRuleClientsAmount(_, { uuid }, { dataSources }) {
    return dataSources.DistributionRuleAPI.getClientsAmount(uuid);
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
