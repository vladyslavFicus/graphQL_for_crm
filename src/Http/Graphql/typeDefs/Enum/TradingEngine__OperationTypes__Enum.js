const { gql } = require('apollo-server-express');

module.exports = gql`
  enum TradingEngine__OperationTypes__Enum {
    BUY
    BUY_LIMIT
    BUY_MARKET
    BUY_STOP
    BUY_STOP_LIMIT
    CREDIT
    SELL
    SELL_LIMIT
    SELL_STOP
    SELL_MARKET
    SELL_STOP_LIMIT
  }
`;
