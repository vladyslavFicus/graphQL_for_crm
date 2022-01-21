const { gql } = require('apollo-server-express');

module.exports = gql`
  enum GridConfig__Types__Enum {
    CLIENT
    PAYMENT
    LEAD
  }
`;
