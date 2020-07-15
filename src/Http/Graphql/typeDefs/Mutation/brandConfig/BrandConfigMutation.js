const { gql } = require('apollo-server-express');

module.exports = gql`
  type BrandConfigMutation {
    create(
      brandId: String!
      config: String!
    ): Boolean

    update(
      brandId: String!
      config: String!
    ): Boolean
  }
`;
