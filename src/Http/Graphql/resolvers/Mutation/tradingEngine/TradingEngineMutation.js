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
  async editOrder(_, { orderId, ...rest }, { dataSources }) {
    await dataSources.TradingEngineAPI.editOrder(orderId, rest);
  },

  /**
   * Edit Order Admin
   *
   * @param _
   * @param orderId
   * @param rest
   * @param dataSources
   *
   * @return {Promise}
   */
  async editOrderAdmin(_, { args: { orderId, ...rest } }, { dataSources }) {
    await dataSources.TradingEngineAPI.editOrderAdmin(orderId, rest);
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
   * Cancel Order
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async cancelOrder(_, args, { dataSources }) {
    await dataSources.TradingEngineAPI.cancelOrder(args.orderId);
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
    await dataSources.TradingEngineAPI.reopenOrder(args.orderId);
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
  updateAccountGroup(_, { accountUuid, force, ...args }, { dataSources }) {
    return dataSources.TradingEngineAPI.updateAccountGroup(accountUuid, force, args);
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

  // =================== Symbols ===================

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
    await dataSources.TradingEngineAPI.createSymbol(args);
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
    await dataSources.TradingEngineAPI.editSymbol(symbol, rest);
  },


  // =================== Groups ===================

  /**
   * Create Group
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async createGroup(_, { args }, { dataSources }) {
    await dataSources.TradingEngineAPI.createGroup(args);
  },

  /**
   * Edit Group
   *
   * @param _
   * @param groupName
   * @param rest
   * @param dataSources
   *
   * @return {Promise}
   */
  async editGroup(_, { args: { groupName, ...rest } }, { dataSources }) {
    await dataSources.TradingEngineAPI.editGroup(groupName, rest);
  },

  /**
   * Delete Group
   *
   * @param _
   * @param groupName
   * @param dataSources
   *
   * @return {Promise}
   */
  async deleteGroup(_, { groupName }, { dataSources }) {
    await dataSources.TradingEngineAPI.deleteGroup(groupName);
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
    await dataSources.TradingEngineAPI.createSecurity(args);
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
    await dataSources.TradingEngineAPI.editSecurity(securityName, rest);
  },


  /**
  * force liquidity provider adapter streaming restart
  */
  restartStreaming(_, __, { dataSources }) {
    return dataSources.LiquidityProviderAPI.streamingRestart();
  },
};
