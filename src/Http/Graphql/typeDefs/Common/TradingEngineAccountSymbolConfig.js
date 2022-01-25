const { gql } = require('apollo-server-express');

module.exports = gql`  
  type TradingEngineAccountSymbolConfig {
    groupName: String
    symbol: String
    bidAdjustment: Float
    askAdjustment: Float
    lotMin: Float
    lotStep: Float
    lotMax: Float
    lotSize: Float
  }
`;
