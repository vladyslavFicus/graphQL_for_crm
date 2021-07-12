const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class TradingEngineAPI extends RESTDataSource {
  /**
   * Get trading engine accounts
   *
   * @param args
   *
   * @return {Promise}
   */
  getAccounts(args) {
    return this.post('/accounts/search', args);
  }

  /**
   * Get trading engine account
   *
   * @param accountUuid
   *
   * @return {Promise}
   */
  getAccount(accountUuid) {
    return this.get(`/accounts/${accountUuid}`);
  }

  /**
   * Get trading engine symbols
   *
   *
   * @return {Promise}
   */
  getSymbols() {
    // TODO: mock data
    return {
      content: [
        {
          symbol: 'EURUSD',
          bid: 1.21627,
          ask: 1.21630,
        },
        {
          symbol: 'USDJPY',
          bid: 109.306,
          ask: 109.309,
        },
      ],
      totalElements: 2,
    };
  }

  /**
   * Get trading engine orders
   *
   *
   * @return {Promise}
   */
  getOrders(args) {
    return this.post('/orders/search', args);
  }

  /**
   * Create Order
   *
   * @param args
   * @param accountUuid
   *
   * @return {Promise}
   */
  createOrder(accountUuid, args) {
    return this.post(`/accounts/${accountUuid}/orders`, args);
  }

  /**
   * Create creditIn
   *
   * @param args
   * @param accountUuid
   *
   * @return {Promise}
   */
  createCreditIn(accountUuid, args) {
    return this.put(`/accounts/${accountUuid}/balance/credit-in`, args);
  }

  /**
   * Create creditOut
   *
   * @param args
   * @param accountUuid
   *
   * @return {Promise}
   */
  createCreditOut(accountUuid, args) {
    return this.put(`/accounts/${accountUuid}/balance/credit-out`, args);
  }
}

module.exports = TradingEngineAPI;
