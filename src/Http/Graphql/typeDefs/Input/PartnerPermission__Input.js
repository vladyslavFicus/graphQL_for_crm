const { gql } = require('apollo-server-express');

module.exports = gql`
  input PartnerPermission__Input {
    allowedIpAddresses: [String]
    forbiddenCountries: [String]
    showFTDAmount: Boolean
    showKycStatus: Boolean
    showNotes: Boolean
    showSalesStatus: Boolean
    minFtdDeposit: Float
  }
`;
