const { gql } = require('apollo-server-express');

module.exports = gql`

  input LeadSearch__Input {
    uuids: [String]
    searchKeyword: String
    desks: [String]
    countries: [String]
    registrationDateStart: String
    registrationDateEnd: String
    languages: [String]
    lastCallDateTo: String
    lastCallDateFrom: String
    lastNoteDateFrom: String
    lastNoteDateTo: String
    salesStatuses: [String]
    salesAgents: [String]
    status: String
    requestId: String
    page: Page__Input
    migrationId: String
    teams: [String]
    searchLimit: Int
  }
`;
