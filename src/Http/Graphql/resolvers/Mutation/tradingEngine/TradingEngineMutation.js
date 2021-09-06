module.exports = {
  /**
   * Create creditIn
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  createCreditIn(_, args, { dataSources }) {
    return dataSources.TradingEngineAPI.createCreditIn(args.accountUuid, args);
  },

  /**
   * Create creditOut
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  createCreditOut(_, args, { dataSources }) {
    return dataSources.TradingEngineAPI.createCreditOut(args.accountUuid, args);
  },

  /**
   * Create Order
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  createOrder(_, args, { dataSources }) {
    return dataSources.TradingEngineAPI.createOrder(args.accountUuid, args);
  },

  /**
   * Edit Order
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async editOrder(_, args, { dataSources }) {
    await dataSources.TradingEngineAPI.editOrder(args.orderId, args);
  },

  /**
   * Close Order
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async closeOrder(_, args, { dataSources }) {
    await dataSources.TradingEngineAPI.closeOrder(args.orderId, args);
  },

  /**
   * Delete Order
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async deleteOrder(_, args, { dataSources }) {
    await dataSources.TradingEngineAPI.deleteOrder(args.orderId);
  },
};
