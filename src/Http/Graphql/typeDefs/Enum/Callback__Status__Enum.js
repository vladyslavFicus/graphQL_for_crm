const { gql } = require('apollo-server-express');

module.exports = gql`
  enum Callback__Status__Enum {
    SUCCESS
    PENDING
    REJECTED
  }
`;
