const { gql } = require('apollo-server-express');

module.exports = gql`
  input PartnerPermission__Input {
    allowedIpAddresses: [String]
    forbiddenCountries: [String]
    restrictedSources: [String!]!
    restrictedReferrals: [String!]!
    showFTDAmount: Boolean
    showKycStatus: Boolean
    showNotes: Boolean
    showSalesStatus: Boolean
    cumulativeDeposit: Boolean
    showAutologinUrl: Boolean
    minFtdDeposit: Float
  }
`;
