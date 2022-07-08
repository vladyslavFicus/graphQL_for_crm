const { gql } = require('apollo-server-express');

module.exports = gql`
  type TradingEngineAccountSymbol {
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
    config(accountUuid: String): TradingEngineAccountSymbolConfig!
  }
`;
