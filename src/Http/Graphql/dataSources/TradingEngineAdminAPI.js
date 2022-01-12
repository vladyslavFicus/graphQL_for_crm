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
   * Edit Security
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
   * Get trading engine symbols sources
   *
   * @return {Promise}
   */
  getSymbolsSources() {
    return this.get('/admin/symbols/sources');
  }

  /**
   * Create Symbol
   *
   * @param args
   *
   * @return {Promise}
   */
  createSymbol(args) {
    return this.post('/admin/symbols', args);
  }

  /**
   * Edit Symbol
   *
   * @param args
   * @param symbol
   *
   * @return {Promise}
   */
  editSymbol(symbol, args) {
    return this.put(`/admin/symbols/${symbol}`, args);
  }

  /**
   * Get symbol by name
   *
   * @return {Promise}
   */
  getSymbol(symbolName) {
    return this.get(`/admin/symbols/${symbolName}`);
  }

  /**
   * Get groups
   *
   * @return {Promise}
   */
  getGroups(args) {
    return this.post('/admin/groups/search', args);
  }

  /**
   * Get group by name
   *
   * @param groupName
   *
   * @return {Promise}
   */
  getGroup(groupName) {
    return this.get(`/admin/groups/${groupName}`);
  }

  /**
   * Create group
   *
   * @param args
   *
   * @return {Promise}
   */
  createGroup(args) {
    return this.post('/admin/groups', args);
  }

  /**
   * Edit group
   *
   * @param groupName
   * @param args
   *
   * @return {Promise}
   */
  editGroup(groupName, args) {
    return this.put(`/admin/groups/${groupName}`, args);
  }

  /**
   * Delete group
   *
   * @param groupName
   *
   * @return {Promise}
   */
  deleteGroup(groupName) {
    return this.delete(`/admin/groups/${groupName}`);
  }
}

module.exports = TradingEngineAdminAPI;
