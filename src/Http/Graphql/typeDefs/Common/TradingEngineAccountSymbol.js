const { gql } = require('apollo-server-express');

module.exports = gql`
  type TradingEngineAccountSymbol {
    name: String!
    description: String!
    digits: Int
    lotSize: Int
    groupSpread(group: String, identifier: String): TradingEngineGroupSpread
  }
`;
