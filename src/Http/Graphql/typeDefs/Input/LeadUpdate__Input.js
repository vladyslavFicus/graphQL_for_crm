const { gql } = require('apollo-server-express');

module.exports = gql`
  input LeadUpdate__Input {
    uuid: String!
    unassignFromOperator: String
  }
`;
