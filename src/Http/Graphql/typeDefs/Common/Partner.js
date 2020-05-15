const { gql } = require('apollo-server-express');

module.exports = gql`
  type Partner__PermissionType {
    allowedIpAddresses: [String]
    forbiddenCountries: [String]
    showFTDAmount: Boolean
    showKycStatus: Boolean
    showNotes: Boolean
    showSalesStatus: Boolean
  }

  type Partner {
    _id: ID!
    affiliateType: String
    authorities: [Authority] @response
    cellexpert: Boolean
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
    satellite: String
    status: String
    statusChangeAuthor: String
    statusChangeDate: String
    statusReason: String
    tradingAccountAutocreation: String
    tradingAccountCurrency: String
    tradingAccountType: String
    uuid: String
  }
`;
