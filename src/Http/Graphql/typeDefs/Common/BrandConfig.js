const { gql } = require('apollo-server-express');

module.exports = gql`
  type BrandConfig {
    brandId: String
    config: String
  }
`;
