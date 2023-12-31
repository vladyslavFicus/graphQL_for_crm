module.exports = {
  /**
   * Create creditIn
   *
   * @param _
   * @param accountUuid
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  createCreditIn(_, { accountUuid, ...args }, { dataSources }) {
    return dataSources.TradingEngineAPI.createCreditIn(accountUuid, args);
  },

  /**
   * Create creditOut
   *
   * @param _
   * @param accountUuid
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  createCreditOut(_, { accountUuid, ...args }, { dataSources }) {
    return dataSources.TradingEngineAPI.createCreditOut(accountUuid, args);
  },

  /**
   * Create correctionIn
   *
   * @param _
   * @param accountUuid
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  createCorrectionIn(_, { accountUuid, ...args }, { dataSources }) {
    return dataSources.TradingEngineAPI.createCorrectionIn(accountUuid, args);
  },

  /**
   * Create correctionOut
   *
   * @param _
   * @param accountUuid
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  createCorrectionOut(_, { accountUuid, ...args }, { dataSources }) {
    return dataSources.TradingEngineAPI.createCorrectionOut(accountUuid, args);
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
   * Create closed order
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  createClosedOrder(_, { accountUuid, ...args }, { dataSources }) {
    return dataSources.TradingEngineAPI.createClosedOrder(accountUuid, args);
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
    * Bulk Close Order
    *
    * @param _
    * @param args
    * @param dataSources
    *
    * @return {Promise}
    */
  async bulkCloseOrders(_, { args }, { dataSources }) {
    await dataSources.TradingEngineAPI.bulkCloseOrders(args);
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
   * @param symbol
   * @param force
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async editSymbol(_, { args: { symbol, force, ...args } }, { dataSources }) {
    await dataSources.TradingEngineAPI.editSymbol(symbol, force, args);
  },

  /**
   * Adding Favorite Symbol
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async addFavoriteSymbols(_, args, { dataSources }) {
    await dataSources.TradingEngineAPI.addFavoriteSymbols(args.symbol, args);
  },

  /**
   * Delete Favorite Symbol
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async deleteFavoriteSymbols(_, args, { dataSources }) {
    await dataSources.TradingEngineAPI.deleteFavoriteSymbols(args.symbol, args);
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
  async editGroup(_, { args: { groupName, force, ...args } }, { dataSources }) {
    await dataSources.TradingEngineAPI.editGroup(groupName, force, args);
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
   * Archive Group
   *
   * @param _
   * @param groupName
   * @param dataSources
   *
   * @return {Promise}
   */
  async archiveGroup(_, { groupName, force, ...rest }, { dataSources }) {
    await dataSources.TradingEngineAPI.archiveGroup(groupName, force, rest);
  },

  /**
   * Delete Symbol
   *
   * @param _
   *  @param args
   * @param symbolName
   * @param force
   * @param dataSources
   *
   * @return {Promise}
   */
  async deleteSymbol(_, { symbolName, force }, { dataSources }) {
    await dataSources.TradingEngineAPI.deleteSymbol(symbolName, force);
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
   * Delete security
   *
   * @param _
   * @param securityName
   * @param dataSources
   *
   * @return {Promise}
   */
  async deleteSecurity(_, { securityName }, { dataSources }) {
    await dataSources.TradingEngineAPI.deleteSecurity(securityName);
  },


  /**
  * force liquidity provider adapter streaming restart
  */
  restartStreaming(_, __, { dataSources }) {
    return dataSources.LiquidityProviderAPI.streamingRestart();
  },

  /**
   * archive/unarchive account
   *
   * @param _
   * @param login
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async setAccountArchiveStatus(_, { uuid, ...rest }, { dataSources }) {
    await dataSources.TradingEngineAPI.setAccountArchiveStatus(uuid, rest);
  },

  /**
   * Create Operator
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  createOperator(_, { args }, { dataSources }) {
    return dataSources.TradingEngineAPI.createOperator(args);
  },

  /**
   * Update Operator
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  updateOperator(_, { uuid, args }, { dataSources }) {
    return dataSources.TradingEngineAPI.updateOperator(uuid, args);
  },

  /**
   * Change Operator role
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  changeOperatorRole(_, { uuid, role }, { dataSources }) {
    return dataSources.TradingEngineAPI.changeOperatorRole(uuid, role);
  },

  /**
   * Change Operator status
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  changeOperatorStatus(_, { uuid, ...args }, { dataSources }) {
    return dataSources.TradingEngineAPI.changeOperatorStatus(uuid, args);
  },

  /**
   * Create holiday
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  createHoliday(_, { args }, { dataSources }) {
    return dataSources.TradingEngineAPI.createHoliday(args);
  },

  /**
   * Edit holiday
   *
   * @param _
   * @param id
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  editHoliday(_, { args: { id, ...args } }, { dataSources }) {
    return dataSources.TradingEngineAPI.editHoliday(id, args);
  },

  /**
   * Delete holiday
   *
   * @param _
   * @param id
   * @param dataSources
   *
   * @return {Promise}
   */
  async deleteHoliday(_, { id }, { dataSources }) {
    await dataSources.TradingEngineAPI.deleteHoliday(id);
  },
};
