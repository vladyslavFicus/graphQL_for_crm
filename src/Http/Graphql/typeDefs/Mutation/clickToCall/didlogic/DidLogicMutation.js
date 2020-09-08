const { gql } = require('apollo-server-express');

module.exports = gql`
  type DidLogicMutation {
    createCall(
      uuid: String!
      field: String!
      type: String!
    ): Boolean
  }
`;
