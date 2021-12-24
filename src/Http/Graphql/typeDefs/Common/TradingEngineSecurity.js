const { gql } = require('apollo-server-express');

module.exports = gql`  
  type TradingEngineSecurity {
    id: String
    name: String
    symbols: [String]
    description: String
  }
`;
