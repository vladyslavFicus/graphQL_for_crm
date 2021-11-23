const { gql } = require('apollo-server-express');

module.exports = gql`  
  type TradingEngineSecurity {
    name: String
    symbols: [String]
    description: String
  }
`;
