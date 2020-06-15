const { gql } = require('apollo-server-express');

module.exports = gql`
  type Authority {
    brand: String!
    department: String!
    id: Int!
    role: String!
  }
`;
