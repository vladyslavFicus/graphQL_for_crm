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
      phone: String @auth_hide_argument(action: "lead.field.phone")
      mobile: String @auth_hide_argument(action: "lead.field.mobile")
      email: String @auth_hide_argument(action: "lead.field.email")
      country: String
      birthDate: String
      gender: String
      city: String
    ): Boolean

    uploadLeads(file: Upload): Boolean
    
    promote(args: PromoteLead__Input): CreatedProfile
  }
`;
