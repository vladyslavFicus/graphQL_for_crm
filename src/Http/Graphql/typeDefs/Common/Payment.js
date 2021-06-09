const { gql } = require('apollo-server-express');

module.exports = gql`
  type Payment__Metadata {
    clientIp: String
    country: String
    mobile: Boolean
    userAgent: String
  }

  type Payment__ClientProfile {
    uuid: String
    firstName: String
    lastName: String
    country: String
    affiliateUuid: String
  }

  type Payment {
    _id: ID!
    accountType: String!
    accountUUID: String
    agentId: String
    agentBranches: [String]
    agentName: String
    amount: String
    brandId: String
    country: String
    createdBy: String
    creationTime: String!
    currency: String
    declineReason: String
    exchangeRate: String
    externalReference: String
    expirationDate: String
    firstTimeDeposit: Boolean
    language: String
    linkedTransactionId: String
    login: String!
    modifiedBy: String
    moto: Boolean
    normalizedAmount: String
    note: Note
    originalAgent: Operator
    partner: Partner
    paymentId: String!
    paymentAggregator: String
    paymentMetadata: Payment__Metadata
    paymentMethod: String
    paymentMigrationId: String
    bankName: String
    maskedPan: String
    paymentType: String!
    platformType: String!
    playerProfile: Payment__ClientProfile
    status: String!
    statusChangedAt: String
    userMigrationId: String
    updatedAt: String
    warnings: [String]
    withdrawStatus: String
    cryptoAmount: String
    cryptoCurrency: String
  }
`;
