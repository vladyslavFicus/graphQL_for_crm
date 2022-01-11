const { gql } = require('apollo-server-express');

module.exports = gql`
  type IpWhitelistAddress {
    uuid: String!
    ip: String!
    brandId: String,
    createdAt: String!
    description: String
  }
  `;
