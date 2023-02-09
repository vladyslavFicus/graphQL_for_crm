const { gql } = require('apollo-server-express');

module.exports = gql`
  type BrandToAuthorities {
    id: String!
    name: String!
    authorities: [Authority!]!
  }
`;
