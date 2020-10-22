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
};
