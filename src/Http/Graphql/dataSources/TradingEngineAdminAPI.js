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

  /**
   * Get trading engine symbols
   *
   * @param args
   *
   * @return {Promise}
   */
  getSymbols(args) {
    return this.post('admin/symbols/search', args);
  }

  /**
   * Create Security
   *
   * @return {Promise}
   */
  createSecurity(args) {
    return this.post('/admin/securities', args);
  }

  /**
   * Create Security
   *
   * @param securityName
   * @param args
   *
   * @return {Promise}
   */
  editSecurity(securityName, args) {
    return this.put(`/admin/securities/${securityName}`, args);
  }

  /**
   * Get trading engine security by name
   *
   * @param securityName
   *
   * @return {Promise}
   */
  getSecurity(securityName) {
    return this.get(`/admin/securities/${securityName}`);
  }

  /**
    * Get groups
    *
    * @return {Promise}
    */
  getGroups(args) {
    return this.post('/admin/groups/search', args);
  }
}

module.exports = TradingEngineAdminAPI;