const { gql } = require('apollo-server-express');

module.exports = gql`
  type Authority {
    brandId: String!
    department: String!
    id: Int!
    role: String!
  }
`;
