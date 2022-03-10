const DataLoader = require('dataloader');
const { isEqual, uniqWith } = require('lodash');
const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');
const orderByArray = require('../../../utils/orderByArray');

class TradingEngineAPI extends RESTDataSource {
  constructor(args) {
    super(args);

    this.accountsLoader = new DataLoader(this._accountsLoader.bind(this));
    this.symbolsLoader = new DataLoader(this._symbolsLoader.bind(this));
    this.accountSymbolConfigsLoader = new DataLoader(this._accountSymbolConfigsLoader.bind(this));
  }

  async _accountsLoader(uuids) {
    const data = await this.post('/accounts/search', { uuids });

    return orderByArray(uuids, data.content, 'uuid');
  }

  async _symbolsLoader(symbolNames) {
    const data = await this.post('/symbols/search', { symbolNames });

    return orderByArray(symbolNames, data.content, 'name');
  }

  async _accountSymbolConfigsLoader(args) {
    // Get uniqueness arguments to make a request
    const uniqArgs = uniqWith(args, isEqual);

    const data = await this.post('/accounts/symbols/configs', uniqArgs);

    // Return right ordered responses for each arg
    return args.map(arg => data.find(({ accountUuid, symbol }) => (
      arg.accountUuid === accountUuid && arg.symbol === symbol
    )));
  }

  // =================== Symbols ===================
  /**
   * Get symbol by name
   *
   * @return {Promise}
   */
  getSymbol(symbolName) {
    return this.get(`/symbols/${symbolName}`);
  }

  /**
   * Get trading engine symbols
   *
   * @param args
   *
   * @return {Promise}
   */
  getSymbols(args) {
    return this.post('/symbols/search', args);
  }

  /**
   * Get trading engine symbols sources
   *
   * @return {Promise}
   */
  getSymbolsSources() {
    return this.get('/symbols/sources');
  }

  /**
     * Get symbol config for concrete account
     *
     * @param accountUuid
     * @param symbol
     *
     * @return {*}
     */
  getSymbolConfig(accountUuid, symbol) {
    return this.accountSymbolConfigsLoader.load({ accountUuid, symbol });
  }

  /**
   * Get symbol prices
   *
   * @param args
   * @param symbol
   *
   * @return {Promise}
   */
  getSymbolPrices(symbol, args) {
    return this.get(`/symbols/${symbol}/price`, args);
  }

  /**
  * Create Symbol
  *
  * @param args
  *
  * @return {Promise}
  */
  createSymbol(args) {
    return this.post('/symbols', args);
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
    return this.put(`/symbols/${symbol}`, args);
  }

  // =================== Groups ===================
  /**
   * Get group by name
   *
   * @param groupName
   *
   * @return {Promise}
   */
  getGroup(groupName) {
    return this.get(`/groups/${groupName}`);
  }

  /**
  * Get groups
  *
  * @return {Promise}
  */
  getGroups(args) {
    return this.post('/groups/search', args);
  }

  /**
   * Create group
   *
   * @param args
   *
   * @return {Promise}
   */
  createGroup(args) {
    return this.post('/groups', args);
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
    return this.put(`/groups/${groupName}`, args);
  }

  /**
   * Delete group
   *
   * @param groupName
   *
   * @return {Promise}
   */
  deleteGroup(groupName) {
    return this.delete(`/groups/${groupName}`);
  }

  // =================== Orders ===================
  /**
   * Get trading engine orders
   *
   * @return {Promise}
   */
  getOrders(args) {
    return this.post('/orders/search', args);
  }

  /**
   * Get trading engine order
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
  cancelOrder(orderId) {
    return this.delete(`/orders/${orderId}`);
  }

  /**
   * Activate Pending Order
   *
   * @param args
   * @param orderId
   *
   * @return {Promise}
   */
  activatePendingOrder(orderId, args) {
    return this.post(`/orders/${orderId}/activate`, args);
  }

  /**
     * Edit Order
     *
     * @param args
     * @param orderId
     *
     * @return {Promise}
     */
  editOrderAdmin(orderId, args) {
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
    return this.put(`/orders/${orderId}/reopen`);
  }

  // =================== Accounts ===================
  /**
 * Get trading engine account
 *
 * @param accountUuid
 *
 * @return {Promise}
 */
  getAccount(accountUuid) {
    return accountUuid && this.accountsLoader.load(accountUuid);
  }

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
     * Get trading engine account by identifier
     *
     * @param identifier
     *
     * @return {Promise}
     */
  getAccountByIdentifier(identifier) {
    return this.get(`/accounts/${identifier}`);
  }

  /**
   * Get account finance statistic
   *
   * @param accountUuid
   *
   * @return {*}
   */
  getAccountStatistic(accountUuid) {
    return this.get(`/accounts/${accountUuid}/finances`);
  }

  /**
   * Get allowed account symbols
   *
   * @param accountUuid
   *
   * @return {Promise}
   */
  getAllowedAccountSymbols(accountUuid) {
    return this.get(`/symbols/${accountUuid}/allowed`);
  }

  /**
   * Update account group
   *
   * @param args
   * @param force
   * @param accountUuid
   *
   * @return {Promise}
   */
  updateAccountGroup(accountUuid, force = false, args) {
    return this.put(`/accounts/${accountUuid}/group`, args, { params: { force } });
  }

  /**
   * Update account leverage
   *
   * @param args
   * @param accountUuid
   *
   * @return {Promise}
   */
  updateAccountLeverage(accountUuid, args) {
    return this.put(`/accounts/${accountUuid}/leverage`, args);
  }

  /**
   * Update account readonly
   *
   * @param args
   * @param accountUuid
   *
   * @return {Promise}
   */
  updateAccountReadonly(accountUuid, args) {
    return this.put(`/accounts/${accountUuid}/readonly`, args);
  }

  // =================== Security ===================
  /**
   * Get trading engine security by name
   *
   * @param securityName
   *
   * @return {Promise}
   */
  getSecurity(securityName) {
    return this.get(`/securities/${securityName}`);
  }

  /**
   * Get trading engine securities
   *
   * @return {Promise}
   */
  getSecurities() {
    return this.get('/securities');
  }

  /**
     * Create Security
     *
     * @return {Promise}
     */
  createSecurity(args) {
    return this.post('/securities', args);
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
    return this.put(`/securities/${securityName}`, args);
  }

  // =================== Credit ===================

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

  /**
  * Get trading engine transactions
  *
  * @return {Promise}
  */
  getTransactions(args) {
    return this.post('/transactions/search', args);
  }

  /**
     * Get trading engine history
     *
     * @return {Promise}
     */
  getHistory(args) {
    return this.post('/history/search', args);
  }
}

module.exports = TradingEngineAPI;
