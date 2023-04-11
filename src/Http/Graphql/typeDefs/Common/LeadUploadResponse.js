const { gql } = require('apollo-server-express');

module.exports = gql`
  type LeadUploadResponse__FailedLeads {
    affiliate: String
    birthDate: String
    country: String
    city: String
    email: String
    gender: String
    language: String
    mobile: String
    name: String
    phone: String
    salesAgent: String
    source: String
    surname: String
    failureReason: String
  }

  type LeadUploadResponse {
    failedLeads: [LeadUploadResponse__FailedLeads!]
    failedLeadsCount: Int
    createdLeadsCount: Int
  }
`;
