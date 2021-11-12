const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class TradingEngineAdminAPI extends RESTDataSource {
  /**
   * Edit Order
   *
   * @param args
   * @param orderId
   *
   * @return {Promise}
   */
  editOrder(orderId, args) {
    return this.put(`/admin/orders/${orderId}`, args);
  }

  /**
   * Reopen Order
   *
   * @param orderId
   *
   * @return {Promise}
   */
  reopenOrder(orderId) {
    return this.put(`/admin/orders/${orderId}/reopen`);
  }

  /**
   * Get trading engine securities
   *
   * @return {Promise}
   */
  getSecurities() {
    return this.get('/admin/securities');
  }
}

module.exports = TradingEngineAdminAPI;
