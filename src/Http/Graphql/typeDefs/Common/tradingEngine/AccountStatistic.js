const { gql } = require('apollo-server-express');

module.exports = gql`
  type TradingEngineAccountStatistic {
    depositsSum: Float
    withdrawalsSum: Float
    balance: Float
    credit: Float
    margin: Float
    freeMargin: Float
    marginLevel: Float
    equity: Float
    openPnl: Float
    closedPnl: Float
  }
`;
