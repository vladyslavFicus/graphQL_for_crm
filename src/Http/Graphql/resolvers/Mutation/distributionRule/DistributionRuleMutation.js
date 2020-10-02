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
};
