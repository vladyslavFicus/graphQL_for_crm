const { gql } = require('apollo-server-express');

module.exports = gql`
  input LeadSearch__Input {
    searchKeyword: String
    countries: [String]
    registrationDateStart: String
    registrationDateEnd: String
    lastNoteDateFrom: String
    lastNoteDateTo: String
    salesStatuses: [String]
    salesAgents: [String]
    status: String
    requestId: String
  }
`;
