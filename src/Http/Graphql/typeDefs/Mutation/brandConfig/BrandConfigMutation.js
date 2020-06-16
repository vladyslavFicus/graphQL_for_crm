const { gql } = require('apollo-server-express');

module.exports = gql`
  type BrandConfigMutation {
    create(brandId: String!, config: String!): Object @response
    update(brandId: String!, config: String!): Object @response
    delete(brandId: String!): Success
  }
`;
