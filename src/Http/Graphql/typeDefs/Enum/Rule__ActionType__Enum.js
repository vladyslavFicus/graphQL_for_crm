const { gql } = require('apollo-server-express');

module.exports = gql`
  enum Rule__ActionType__Enum {
    DEFAULT
    ROUND_ROBIN
  }
`;
