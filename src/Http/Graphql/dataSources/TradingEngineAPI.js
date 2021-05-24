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
    // TODO: need to replace the path by Trading Engine service
    return this.get('/accounts/search', args);
  }
}

module.exports = TradingEngineAPI;
