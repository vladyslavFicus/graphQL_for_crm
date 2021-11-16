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
   * Create Securities
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async createSecurities(_, args, { dataSources }) {
    await dataSources.TradingEngineAdminAPI.createSecurities(args);
  },
};
