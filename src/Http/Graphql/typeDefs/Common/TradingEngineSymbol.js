const { gql } = require('apollo-server-express');

module.exports = gql`  
  type TradingEngineSymbol {
    name: String!
    digits: Float!
    bid: Float!
    ask: Float!
    config(accountUuid: String): TradingEngineAccountSymbolConfig!
  }
`;
