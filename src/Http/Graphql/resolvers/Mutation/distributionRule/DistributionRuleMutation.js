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
};
