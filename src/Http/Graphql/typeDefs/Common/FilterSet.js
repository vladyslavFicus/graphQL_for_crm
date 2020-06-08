const { gql } = require('apollo-server-express');

module.exports = gql`
  enum FilterSet__Types {
    CLIENT
    PAYMENT
    LEAD
  }

  type FilterSet__Option {
    uuid: String!
    name: String!
    favourite: Boolean
  }

  type FilterSet {
    common: [FilterSet__Option]
    favourite: [FilterSet__Option]
  }
`;
