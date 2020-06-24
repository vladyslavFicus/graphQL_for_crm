const { gql } = require('apollo-server-express');

module.exports = gql`
  input ClientToUpdateInput {
    uuid: String!
    salesRepresentative: String
    retentionRepresentative: String
  }
`;
