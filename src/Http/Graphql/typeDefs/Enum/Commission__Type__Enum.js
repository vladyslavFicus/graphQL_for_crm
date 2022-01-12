const { gql } = require('apollo-server-express');

module.exports = gql`
  enum Commission__Type__Enum {
    MONEY
    PIPS
    PERCENT
  }
`;
