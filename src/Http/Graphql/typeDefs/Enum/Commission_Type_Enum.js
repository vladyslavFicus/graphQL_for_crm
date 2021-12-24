const { gql } = require('apollo-server-express');

module.exports = gql`
  enum Commission_Type_Enum {
    MONEY
    PIPS
    PERCENT
  }
`;
