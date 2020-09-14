module.exports = {
  /**
   * Create sales rule
   *
   * @param _
   * @param args
   * @param dataSources
   * @param brand
   * @param userUUID
   *
   * @return {*}
   */
  async createRule(_, args, { dataSources, brand, userUUID }) {
    await dataSources.RuleProfileAPI.createRule({
      ...args,
      brandId: brand.id,
      createdBy: userUUID,
    });
  },

  /**
   * Delete sales rule
   *
   * @param _
   * @param uuid
   * @param dataSources
   *
   * @return {Promise}
   */
  async deleteRule(_, { uuid }, { dataSources }) {
    await dataSources.RuleProfileAPI.deleteRule(uuid);
  },

  /**
   * Create retention rule
   *
   * @param _
   * @param args
   * @param dataSources
   * @param brand
   * @param userUUID
   *
   * @return {*}
   */
  async createRuleRetention(_, args, { dataSources, brand, userUUID }) {
    await dataSources.RulePaymentAPI.createRule({
      ...args,
      brandId: brand.id,
      createdBy: userUUID,
    });
  },

  /**
   * Delete retention rule
   *
   * @param _
   * @param uuid
   * @param dataSources
   *
   * @return {Promise}
   */
  async deleteRuleRetention(_, { uuid }, { dataSources }) {
    await dataSources.RulePaymentAPI.deleteRule(uuid);
  },
};
