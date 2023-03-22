const { gql } = require('apollo-server-express');

module.exports = gql`
  input BulkPartnersCountries__Input {
    uuids: [String!]
    forbiddenCountries: [String!]
    bulkSize: Int
    sorts: [Sort__Input]
    searchParams: BulkPartnersSearchParams__Input
  }
  
  input BulkPartnersSearchParams__Input {
    searchBy: String
    country: String
    status: String
    registrationDateFrom: String
    registrationDateTo: String
  }
`;
