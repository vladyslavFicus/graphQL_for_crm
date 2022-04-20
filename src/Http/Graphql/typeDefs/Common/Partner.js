const { gql } = require('apollo-server-express');

module.exports = gql`
  type Partner__Schedule__CountrySpreads {
    country: String
    limit: Int
  }

  type Partner__Schedule {
    configId: String
    activated: Boolean
    day: String
    totalLimit: Int
    countrySpreads: [Partner__Schedule__CountrySpreads]
    workingHoursFrom: String
    workingHoursTo: String
  }
  
  type Partner__PermissionType {
    allowedIpAddresses: [String]
    forbiddenCountries: [String]
    restrictedSources: [String!]!
    restrictedReferrals: [String!]!
    showFTDAmount: Boolean
    showKycStatus: Boolean
    showSalesStatus: Boolean
    showNotes: Boolean
    cumulativeDeposit: Boolean
    showAutologinUrl: Boolean  
    minFtdDeposit: Float
  }

  type Partner {
    _id: ID!
    brand: String
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
    uuid: String!
    schedule: [Partner__Schedule]
    cdeAffiliate: Boolean
  }
`;
