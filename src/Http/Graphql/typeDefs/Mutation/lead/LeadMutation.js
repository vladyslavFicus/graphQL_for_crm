const { gql } = require('apollo-server-express');

module.exports = gql`
  type LeadMutation {
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

    uploadLeads(file: Upload): [LeadResult]

    promote(args: PromoteLead__Input): Boolean
  }
`;
