const { gql } = require('apollo-server-express');

module.exports = gql`
  input BulkPartnersCountries__Input {
    uuids: [String!]
    forbiddenCountries: [String!]
  }
`;
