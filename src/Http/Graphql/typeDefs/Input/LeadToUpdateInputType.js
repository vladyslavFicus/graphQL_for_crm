const { gql } = require('apollo-server-express');

module.exports = gql`
  input LeadToUpdateInputType {
    uuid: String!
    unassignFromOperator: String
  }
`;
