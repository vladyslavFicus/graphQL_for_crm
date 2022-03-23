const { gql } = require('apollo-server-express');

module.exports = gql`
  input TradingEngineUpdateOperator__Input {
    firstName: String
    lastName: String
    phone: String
    groupNames: [String]
    role: String
  }
`;
