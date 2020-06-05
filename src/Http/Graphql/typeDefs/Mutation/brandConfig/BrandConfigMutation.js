const { gql } = require('apollo-server-express');

module.exports = gql`
  type BrandConfigMutation {
    create(brandId: String!, config: String!): JSONObject @response
    update(brandId: String!, config: String!): JSONObject @response
    delete(brandId: String!): Success
  }
`;
