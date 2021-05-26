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
          symbol: 'EURSD',
          bid: 12.3434,
          ask: 1.3434343,
        },
        {
          symbol: 'USD',
          bid: 12.3333,
          ask: 1.444444,
        },
      ],
    };
  }
}

module.exports = TradingEngineAPI;
