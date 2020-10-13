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
  async create(_, args, { dataSources }) {
    await dataSources.DistributionRuleAPI.create(args);
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
  async update(_, { uuid, ...args }, { dataSources }) {
    await dataSources.DistributionRuleAPI.update(uuid, args);
  },
};
