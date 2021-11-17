module.exports = {
  /**
   * Edit Order
   *
   * @param _
   * @param orderId
   * @param rest
   * @param dataSources
   *
   * @return {Promise}
   */
  async editOrder(_, { args: { orderId, ...rest } }, { dataSources }) {
    await dataSources.TradingEngineAdminAPI.editOrder(orderId, rest);
  },

  /**
   * Reopen Order
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async reopenOrder(_, args, { dataSources }) {
    await dataSources.TradingEngineAdminAPI.reopenOrder(args.orderId);
  },

  /**
   * Create Security
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async createSecurity(_, args, { dataSources }) {
    await dataSources.TradingEngineAdminAPI.createSecurity(args);
  },

  /**
   * Edit Security
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async editSecurity(_, { securityName, ...rest }, { dataSources }) {
    await dataSources.TradingEngineAdminAPI.editSecurity(securityName, rest);
  },
};
