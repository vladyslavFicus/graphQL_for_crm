const { gql } = require('apollo-server-express');

module.exports = gql`
  type TokenRenew {
    token: String
  }
`;
