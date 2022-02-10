const { gql } = require('apollo-server-express');

module.exports = gql`  
  type TradingEngineSecurity {
    id: Int!
    name: String!
    symbols: [String]!
    description: String!
  }
`;
