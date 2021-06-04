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
      totalElements: 2,
    };
  }

  /**
   * Get trading engine orders
   *
   *
   * @return {Promise}
   */
  getOrders() {
    // TODO: mock data
    return {
      content: [
        {
          id: '4577fef4',
          login: 2121449256,
          symbol: 'EURSD',
          symbolAlias: 'symbolAlias',
          direction: 'direction',
          operationType: 'OP_BUY',
          digits: 23,
          takeProfit: 45,
          stopLoss: 67,
          openPrice: 12,
          closePrice: 98,
          marginRate: 55,
          volumeUnits: 78,
          volumeLots: 33,
          lotSize: 78,
          commission: 444,
          swaps: 787,
          pnl: 343,
          time: 32423432,
          comment: 'comment',
          tradeType: 'LIVE',
          tradeStatus: 'OPEN',
        },
        {
          id: '4577fef4',
          login: 2121449282,
          symbol: 'EURSD',
          symbolAlias: 'symbolAlias',
          direction: 'direction',
          operationType: 'OP_BUY',
          digits: 23,
          takeProfit: 45,
          stopLoss: 67,
          openPrice: 12,
          closePrice: 98,
          marginRate: 55,
          volumeUnits: 78,
          volumeLots: 33,
          lotSize: 78,
          commission: 444,
          swaps: 787,
          pnl: 343,
          time: 32423432,
          comment: 'comment',
          tradeType: 'LIVE',
          tradeStatus: 'OPEN',
        },
      ],
      totalElements: 2,
      size: 0,
      last: true,
    };
  }
}

module.exports = TradingEngineAPI;
