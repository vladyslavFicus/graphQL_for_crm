const { gql } = require('apollo-server-express');

module.exports = gql`
  type LeadMutation {
    bulkLeadUpdate(
      salesRep: [String]
      salesStatus: String
      leads: [LeadUpdate__Input]
      allRowsSelected: Boolean
      totalElements: Int
      searchParams: LeadSearch__Input
    ): Boolean

    update(
      uuid: String!
      name: String
      surname: String
      phone: String
      mobile: String
      email: String
      country: String
      birthDate: String
      gender: String
      city: String
    ): Boolean

    uploadLeads(file: Upload): Boolean
  }
`;
