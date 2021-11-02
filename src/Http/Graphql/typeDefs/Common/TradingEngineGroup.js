const { gql } = require('apollo-server-express');

module.exports = gql`  
  type TradingEngineGroup {
    groupName: String
  }
`;
