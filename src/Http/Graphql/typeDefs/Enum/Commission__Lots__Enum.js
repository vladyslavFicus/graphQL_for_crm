const { gql } = require('apollo-server-express');

module.exports = gql`
  enum Commission__Lots__Enum {
    LOT
    DEAL
  }
`;
