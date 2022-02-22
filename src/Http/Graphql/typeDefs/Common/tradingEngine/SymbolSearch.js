const { gql } = require('apollo-server-express');

module.exports = gql`
  type TradingEngineSymbolSearch__SwapConfigs {
    long: Float
    short: Float
  }

  type TradingEngineSymbolSearch {
    name: String!
    symbol: String!
    securityId: Int!
    securityName: String!
    askSpread: Float!
    bidSpread: Float!
    stopsLevel: Float!
    digits: Int!
    percentage: Float!
    swapConfigs: TradingEngineSymbolSearch__SwapConfigs!
    config(accountUuid: String): TradingEngineAccountSymbolConfig!
  }
`;
