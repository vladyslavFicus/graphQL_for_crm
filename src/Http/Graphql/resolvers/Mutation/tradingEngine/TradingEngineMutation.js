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

  /**
   * Activate Pending Order
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async activatePendingOrder(_, args, { dataSources }) {
    await dataSources.TradingEngineAPI.activatePendingOrder(args.orderId, args);
  },

  /**
   * Update account group
   *
   * @param _
   * @param accountUuid
   * @param rest
   * @param dataSources
   *
   * @return {Promise}
   */
  updateAccountGroup(_, { accountUuid, ...rest }, { dataSources }) {
    return dataSources.TradingEngineAPI.updateAccountGroup(accountUuid, rest);
  },

  /**
   * Update account leverage
   *
   * @param _
   * @param accountUuid
   * @param rest
   * @param dataSources
   *
   * @return {Promise}
   */
  updateAccountLeverage(_, { accountUuid, ...rest }, { dataSources }) {
    return dataSources.TradingEngineAPI.updateAccountLeverage(accountUuid, rest);
  },

  /**
   * Update account readonly
   *
   * @param _
   * @param accountUuid
   * @param rest
   * @param dataSources
   *
   * @return {Promise}
   */
  updateAccountReadonly(_, { accountUuid, ...rest }, { dataSources }) {
    return dataSources.TradingEngineAPI.updateAccountReadonly(accountUuid, rest);
  },

  /**
   * Create Symbol
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async createSymbol(_, { args }, { dataSources }) {
    await dataSources.TradingEngineAdminAPI.createSymbol(args);
  },

  /**
   * Edit Symbol
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async editSymbol(_, { args: { symbol, ...rest } }, { dataSources }) {
    await dataSources.TradingEngineAdminAPI.editSymbol(symbol, rest);
  },
};
