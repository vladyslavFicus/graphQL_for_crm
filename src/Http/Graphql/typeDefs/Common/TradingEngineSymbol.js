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
  
  type TradingEngineAdminSymbol__SwapConfigs {
    long: Float
    short: Float
  }
  
  type TradingEngineAdminSymbol {
    symbol: String
    percentage: Float
    securityName: String
    askSpread: Float
    bidSpread: Float
    stopsLevel: Float
    digits: Int
    swapConfigs: TradingEngineAdminSymbol__SwapConfigs
  }
`;
