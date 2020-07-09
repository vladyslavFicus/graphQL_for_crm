const { gql } = require('apollo-server-express');

module.exports = gql`
  type Partner__PermissionType {
    allowedIpAddresses: [String]
    forbiddenCountries: [String]
    showFTDAmount: Boolean
    showKycStatus: Boolean
    showSalesStatus: Boolean
    showNotes: Boolean
  }

  type Partner {
    _id: ID!
    authorities: [Authority]
    country: String
    createdAt: String
    createdBy: String
    email: String
    externalAffiliateId: String
    firstName: String
    fullName: String
    lastName: String
    permission: Partner__PermissionType
    phone: String
    public: Boolean
    status: String
    statusChangeAuthor: String
    statusChangeDate: String
    uuid: String
  }
`;
