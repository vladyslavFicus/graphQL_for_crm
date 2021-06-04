const { gql } = require('apollo-server-express');

module.exports = gql`
  enum TradingEngine__OperationTypes__Enum {
    OP_BUY
    OP_BUY_LIMIT
    OP_BUY_MARKET
    OP_BUY_STOP
    OP_BUY_STOP_LIMIT
    OP_CREDIT
    OP_SELL
    OP_SELL_LIMIT
    OP_SELL_STOP
    OP_SELL_MARKET
    OP_SELL_STOP_LIMIT
  }
`;
