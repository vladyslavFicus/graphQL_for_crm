const { gql } = require('apollo-server-express');

module.exports = gql`
  input LeadsSearchParamsInputType {
    searchKeyword: String
    countries: [String]
    registrationDateStart: String
    registrationDateEnd: String
    salesStatuses: [String]
    salesAgents: [String]
    status: String
    requestId: String
  }
`;
