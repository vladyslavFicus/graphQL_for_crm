const { gql } = require('apollo-server-express');

module.exports = gql`
  type LeadUpdaterMutation {
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

    bulkLeadUpdate(
      salesRep: [String]
      salesStatus: String
      leads: [LeadToUpdateInputType]
      allRowsSelected: Boolean
      totalElements: Int
      searchParams: LeadsSearchParamsInputType
    ): Boolean
  }
`;
