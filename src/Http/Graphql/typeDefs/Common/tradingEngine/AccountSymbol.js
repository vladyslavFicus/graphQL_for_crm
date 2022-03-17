const { gql } = require('apollo-server-express');

module.exports = gql`
  type TradingEngineAccountSymbol {
    name: String!
    description: String!
    digits: Int!
    symbolType: TradingEngine__SymbolTypes__Enum!
    config(accountUuid: String): TradingEngineAccountSymbolConfig
  }
`;
