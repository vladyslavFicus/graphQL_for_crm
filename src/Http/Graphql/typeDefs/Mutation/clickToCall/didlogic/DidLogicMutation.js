const { gql } = require('apollo-server-express');

module.exports = gql`
  type DidLogicMutation {
    createCall(number: String!): Success
  }
`;
