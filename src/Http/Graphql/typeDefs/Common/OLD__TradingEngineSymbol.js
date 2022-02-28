const { gql } = require('apollo-server-express');

module.exports = gql`  
  type OLD__TradingEngineSymbol {
    name: String!
    digits: Float!
    bid: Float!
    ask: Float!
    config(accountUuid: String): TradingEngineAccountSymbolConfig!
  }
`;
