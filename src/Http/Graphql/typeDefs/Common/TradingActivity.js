const { gql } = require('apollo-server-express');

module.exports = gql`
  enum TradingActivity__OperationTypes {
    OP_BALANCE
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

  enum TradingActivity__Statuses {
    OPEN
    CLOSED
    PENDING
  }

  type TradingActivity {
    closePrice: Float
    closeRate: Float
    closeTime: Int
    comment: String
    commission: Float
    commissionAgent: Float
    digits: Int
    expiration: Int
    login: Int!
    id: ID!
    magic: Int
    openPrice: Float
    openRate: Float
    openTime: Int
    operationType: TradingActivity__OperationTypes
    originalAgent: Operator
    platformType: String
    profit: Float
    reason: String
    stopLoss: Float
    swap: Float
    symbol: String
    takeProfit: Float
    taxes: Float
    timestamp: Int
    tradeId: Int!
    tradeStatus: String
    tradeType: String
    volume: Float
  }
`;
