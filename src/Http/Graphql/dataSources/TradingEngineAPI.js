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
    return this.get('/symbols/price');
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
   * Get trading engine order
   *
   *
   * @return {Promise}
   */
  getOrder(orderId) {
    return this.get(`/orders/${orderId}`);
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
   * Edit Order
   *
   * @param args
   * @param orderId
   *
   * @return {Promise}
   */
  editOrder(orderId, args) {
    return this.put(`/orders/${orderId}`, args);
  }

  /**
   * Close Order
   *
   * @param args
   * @param orderId
   *
   * @return {Promise}
   */
  closeOrder(orderId, args) {
    return this.post(`/orders/${orderId}/_close`, args);
  }

  /**
   * Delete Order
   *
   * @param orderId
   *
   * @return {Promise}
   */
  deleteOrder(orderId) {
    return this.delete(`/orders/${orderId}`);
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
