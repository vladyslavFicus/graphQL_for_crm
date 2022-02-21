const { gql } = require('apollo-server-express');

module.exports = gql`  
  type TradingEngineCredit {
    accountUuid: String
    credit: Float
    balance: Float
  }
`;
