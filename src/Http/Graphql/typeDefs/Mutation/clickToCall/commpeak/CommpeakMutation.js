const { gql } = require('apollo-server-express');

module.exports = gql`
  type CommpeakMutation {
    createCall(
      uuid: String!
      field: String!
      type: String!
      prefix: String!
    ): Boolean
  }
`;
