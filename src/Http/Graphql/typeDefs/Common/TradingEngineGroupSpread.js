const { gql } = require('apollo-server-express');

module.exports = gql`  
  type TradingEngineGroupSpread {
    groupName: String
    symbol: String
    bidAdjustment: Float
    askAdjustment: Float
  }
`;
