const { gql } = require('apollo-server-express');

module.exports = gql`
  type AsteriskMutation {
    createCall(
      uuid: String!
      field: String!
      type: String!
      prefix: Int!
    ): Boolean
  }
`;
