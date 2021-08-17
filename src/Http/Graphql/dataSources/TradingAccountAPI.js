const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class TradingAccountAPI extends RESTDataSource {
  /**
   * Get trading accounts
   *
   * @param args
   * @param args.profileUUID
   * @param args.accountType
   *
   * @return {Promise}
   */
  getClientTradingAccounts(args) {
    return this.get('/account/search', args);
  }

  /**
   * Create trading account
   *
   * @param args
   *
   * @return {Promise}
   */
  createTradingAccount(args) {
    return this.post('/account', args);
  }

  /**
   * Update name of trading account
   *
   * @param uuid | accountUuid
   * @param args
   *
   * @return {Promise}
   */
  renameTradingAccount(uuid, args) {
    return this.put(`/account/${uuid}/name`, args);
  }

  /**
   * Disabling or enabling trading account
   *
   * @param uuid | accountUuid
   * @param args
   *
   * @return {Promise}
   */
  toggleDisabledTradingAccount(uuid, args) {
    return this.put(`/account/${uuid}/readonly`, args);
  }

  /**
   * Change trading account's password
   *
   * @param uuid | accountUuid
   * @param args
   *
   * @return {Promise}
   */
  changeTradingAccountPassword(uuid, args) {
    return this.put(`/account/${uuid}/password`, args);
  }

  /**
   * Change leverage
   *
   * @param uuid | accountUuid
   * @param args
   *
   * @return {Promise}
   */
  changeLeverage(uuid, args) {
    return this.post(`/account/${uuid}/leverage`, args);
  }

  /**
   * Approve leverage
   *
   * @param uuid | accountUuid
   *
   * @return {Promise}
   */
  approveChangingLeverage(uuid) {
    return this.put(`/account/${uuid}/leverage/approve`);
  }

  /**
   * Reject leverage
   *
   * @param uuid | accountUuid
   *
   * @return {Promise}
   */
  rejectChangingLeverage(uuid) {
    return this.put(`/account/${uuid}/leverage/reject`);
  }
}

module.exports = TradingAccountAPI;
