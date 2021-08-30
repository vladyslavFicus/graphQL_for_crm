const { gql } = require('apollo-server-express');

module.exports = gql`
  type TradingEngineAccountSymbol {
    name: String!
    description: String!
  }
`;
