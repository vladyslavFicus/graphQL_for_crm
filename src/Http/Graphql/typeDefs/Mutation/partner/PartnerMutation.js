const { gql } = require('apollo-server-express');

module.exports = gql`
  input PartnerMutation__PermissionType {
    allowedIpAddresses: [String]
    forbiddenCountries: [String]
    showFTDAmount: Boolean
    showKycStatus: Boolean
    showNotes: Boolean
  }

  type PartnerMutation {
    createPartner(
      email: String!
      externalAffiliateId: String
      firstName: String!
      lastName: String!
      password: String!
      phone: String
      public: Boolean
    ): Success @response

    updatePartner(
      country: String
      email: String
      externalAffiliateId: String
      firstName: String!
      lastName: String!
      permission: PartnerMutation__PermissionType
      phone: String
      public: Boolean
      uuid: String!
    ): Partner @response

    changePartnerAccountStatus(uuid: String!, reason: String!, status: String!): Success
  }
`;
