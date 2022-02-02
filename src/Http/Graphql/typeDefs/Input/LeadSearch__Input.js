const { gql } = require('apollo-server-express');

module.exports = gql`

  input Lead__Input__LastCallDateRange {
    from: String
    to: String
  }

  input LeadSearch__Input {
    uuids: [String]
    searchKeyword: String
    desks: [String]
    countries: [String]
    registrationDateStart: String
    registrationDateEnd: String
    languages: [String]
    lastCallDateRange: Lead__Input__LastCallDateRange
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
