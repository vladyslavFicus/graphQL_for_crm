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
  getOrders() {
    // TODO: mock data
    return {
      content: [
        {
          id: '4577fef4',
          login: 2121449256,
          symbol: 'EURUSD',
          symbolAlias: 'symbolAlias',
          direction: 'direction',
          operationType: 'OP_BUY',
          digits: 23,
          takeProfit: 1.21709,
          stopLoss: 1.21509,
          openPrice: 1.21609,
          closePrice: 98,
          marginRate: 55,
          volumeUnits: 0.1,
          volumeLots: 33,
          lotSize: 0.1,
          commission: 444,
          swaps: -3.44,
          pnl: 35.63,
          time: 1623068513004,
          comment: 'comment',
          tradeType: 'LIVE',
          tradeStatus: 'OPEN',
        },
        {
          id: '4577fef4',
          login: 2121449282,
          symbol: 'EURUSD',
          symbolAlias: 'symbolAlias',
          direction: 'direction',
          operationType: 'OP_BUY',
          digits: 23,
          takeProfit: 1.21709,
          stopLoss: 1.21509,
          openPrice: 1.21609,
          closePrice: 98,
          marginRate: 55,
          volumeUnits: 0.1,
          volumeLots: 33,
          lotSize: 0.1,
          commission: 444,
          swaps: -3.44,
          pnl: 35.63,
          time: 1623068513004,
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

  /**
   * Create creditIn
   *
   * @param args
   * @param accountUuid
   *
   * @return {Promise}
   */
  createCreditIn(accountUuid, args) {
    console.log('----createCreditIn-----', accountUuid, args);
    // return this.put(`accounts/${accountUuid}/balance/credit-in`, args);
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
    console.log('----createCreditOut-----', args);
    // return this.put(`accounts/${accountUuid}/balance/credit-out`, args);
  }
}

module.exports = TradingEngineAPI;
