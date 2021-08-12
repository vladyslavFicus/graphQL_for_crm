const { gql } = require('apollo-server-express');

module.exports = gql`  
  type TradingEngineSymbols {
    symbol: String
    bid: Float
    ask: Float
  }
`;
