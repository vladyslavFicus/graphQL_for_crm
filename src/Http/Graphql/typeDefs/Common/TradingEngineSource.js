const { gql } = require('apollo-server-express');

module.exports = gql`  
  type TradingEngineSource {
    sourceName: String
  }
`;
