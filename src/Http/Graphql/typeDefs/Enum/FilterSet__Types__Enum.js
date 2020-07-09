const { gql } = require('apollo-server-express');

module.exports = gql`
  enum FilterSet__Types__Enum {
    CLIENT
    PAYMENT
    LEAD
  }
`;
