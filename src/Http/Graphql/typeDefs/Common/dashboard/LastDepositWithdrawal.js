const { gql } = require('apollo-server-express');

module.exports = gql`
 type LastDepositWithdrawal__Metadata {
    clientIp: String
    country: String
    mobile: Boolean
    userAgent: String
  }

  type LastDepositWithdrawal__PlayerProfile {
    uuid: String!
    firstName: String
    lastName: String
    country: String
    affiliateUuid: String
    affiliateFullName: String
  }

  type LastDepositWithdrawal {
    platformType: String
    login: String
    accountType: String
    paymentId: String!
    amount: Float!
    cryptoAmount: Float
    currency: String!
    language: String
    status: String!
    bankName: String
    maskedPan: String
    paymentType: String!
    paymentMethod: String
    paymentAggregator: String
    externalReference: String
    creationTime: String!
    statusChangedAt: String
    createdBy: String
    modifiedBy: String
    agentId: String
    agentName: String 
    paymentMigrationId: String
    userMigrationId: String
    normalizedAmount: Float
    declineReason: String
    cryptoCurrency: String
    playerProfile: LastDepositWithdrawal__PlayerProfile!
    paymentMetadata: LastDepositWithdrawal__Metadata
  }
`;
