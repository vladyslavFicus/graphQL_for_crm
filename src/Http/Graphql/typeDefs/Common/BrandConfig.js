const { gql } = require('apollo-server-express');

module.exports = gql`
  type BrandConfig {
    brandName: String!
    brandId: String!
    config: String!
  }
`;
