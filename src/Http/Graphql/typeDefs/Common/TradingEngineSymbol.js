const { gql } = require('apollo-server-express');

module.exports = gql`  
  type TradingEngineSymbol {
    name: String
    bid: Float
    ask: Float
    lotSize: Float
    groupSpread(group: String, identifier: String): TradingEngineGroupSpread
    
    # Next fields not implemented yet    
    securities: String
    spread: String
    stop: Float
    long: Float
    short: Float
    digits: Float
  }
`;
