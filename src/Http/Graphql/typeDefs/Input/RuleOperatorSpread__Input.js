const { gql } = require('apollo-server-express');

module.exports = gql`
  input RuleOperatorSpread__Input {
    parentUser: String
    percentage: Int
  }
`;
