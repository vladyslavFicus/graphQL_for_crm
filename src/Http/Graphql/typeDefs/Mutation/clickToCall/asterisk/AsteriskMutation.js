const { gql } = require('apollo-server-express');

module.exports = gql`
  type AsteriskMutation {
    createCall(number: String!, prefix: Int!): Boolean
  }
`;
