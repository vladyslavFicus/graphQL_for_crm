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
   * Create rule
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  create(_, args, { dataSources }) {
    return dataSources.DistributionRuleAPI.create(args);
  },

  /**
   * Update rule name and order
   *
   * @param _
   * @param uuid
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  update(_, { uuid, ...args }, { dataSources }) {
    return dataSources.DistributionRuleAPI.update(uuid, args);
  },

  /**
   * Update rule settings
   *
   * @param _
   * @param uuid
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  updateRule(_, { args: { uuid, ...args } }, { dataSources }) {
    return dataSources.DistributionRuleAPI.updateRule(uuid, args);
  },

  /**
   * Update rule status
   *
   * @param _
   * @param uuid
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  updateRuleStatus(_, { uuid, ...args }, { dataSources }) {
    return dataSources.DistributionRuleAPI.updateRuleStatus(uuid, args);
  },
};
