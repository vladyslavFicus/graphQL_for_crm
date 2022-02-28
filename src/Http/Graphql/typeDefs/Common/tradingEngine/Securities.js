const { gql } = require('apollo-server-express');

module.exports = gql`  
  type TradingEngineSecurities {
    name: String
    symbols: [String]
    description: String
  }
`;
