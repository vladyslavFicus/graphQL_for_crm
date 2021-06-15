const { gql } = require('apollo-server-express');

module.exports = gql`
  type CoperatoMutation {
    createCall(
      uuid: String!
      field: String!
      type: String!
      prefix: String!
    ): Boolean
  }
`;
