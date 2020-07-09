const { gql } = require('apollo-server-express');

module.exports = gql`  
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
    operationType: TradingActivity__OperationTypes__Enum
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
