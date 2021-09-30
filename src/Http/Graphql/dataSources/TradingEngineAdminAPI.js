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
    return this.put(`/orders/${orderId}`, args);
  }

  /**
   * Reopen Order
   *
   * @param orderId
   *
   * @return {Promise}
   */
  reopenOrder(orderId) {
    return this.put(`/orders/${orderId}/reopen`);
  }
}

module.exports = TradingEngineAdminAPI;
