const { gql } = require('apollo-server-express');

module.exports = gql`
  input ClientUpdate__Input {
    uuid: String!
    salesRepresentative: String
    retentionRepresentative: String
  }
`;
