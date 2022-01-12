const { gql } = require('apollo-server-express');

module.exports = gql`
  type TradingEngineAdminSymbolSearch__SwapConfigs {
    long: Float
    short: Float
  }

  type TradingEngineAdminSymbolSearch {
    symbol: String
    securityName: String
    askSpread: Float
    bidSpread: Float
    stopsLevel: Float
    digits: Int
    percentage: Float
    swapConfigs: TradingEngineAdminSymbolSearch__SwapConfigs
  }
`;
