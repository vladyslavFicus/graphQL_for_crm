const { gql } = require('apollo-server-express');

module.exports = gql`  
  type TradingEngineTransaction {
    id: ID
    accountLogin: Int
    type: String
    amount: Float
    createdAt: String
    comment: String
  }
`;
