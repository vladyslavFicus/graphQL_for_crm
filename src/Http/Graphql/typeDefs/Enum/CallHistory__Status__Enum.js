const { gql } = require('apollo-server-express');

module.exports = gql`
  enum CallHistory__Status__Enum {
    UNDEFINED
    NON_ANSWERED
    BUSY
    ANSWERED
  }
`;
