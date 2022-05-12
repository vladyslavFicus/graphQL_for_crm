const { gql } = require('apollo-server-express');

module.exports = gql`  
  type TradingEngineHistory {
    id: Int!
    accountLogin: Int!
    type: String!
    closingTime: String
    openingTime: String
    symbol: String
    volume: Float
    closePrice: Float
    profit: Float
    deletedAt: String
    openPrice: Float
    stopLoss: Float
    takeProfit: Float
    swaps: Float
    commission: Float
    status: String
  }
`;
