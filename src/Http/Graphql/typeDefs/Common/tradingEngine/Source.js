const { gql } = require('apollo-server-express');

module.exports = gql`  
  type TradingEngineSymbolSource {
    sourceName: String!
  }
`;
