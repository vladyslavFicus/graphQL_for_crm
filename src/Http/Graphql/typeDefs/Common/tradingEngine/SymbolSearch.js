const { gql } = require('apollo-server-express');

module.exports = gql`
  type TradingEngineSymbolSearch__SwapConfigs {
    long: Float
    short: Float
  }

  type TradingEngineSymbolSearch {
    name: String!
    description: String
    symbol: String!
    securityId: Int!
    securityName: String!
    askSpread: Float!
    bidSpread: Float!
    stopsLevel: Float!
    digits: Int!
    percentage: Float!
    enabled: Boolean!
    baseCurrency: String
    quoteCurrency: String!
    source: String
    symbolType: TradingEngine__SymbolTypes__Enum!
    swapConfigs: TradingEngineSymbolSearch__SwapConfigs!
    config(accountUuid: String): TradingEngineAccountSymbolConfig!
  }
`;
