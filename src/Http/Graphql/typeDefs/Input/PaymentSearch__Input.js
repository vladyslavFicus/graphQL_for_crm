const { gql } = require('apollo-server-express');

module.exports = gql`
  input PaymentSearch__Input {
    accountType: String
    agentIds: [String]
    affiliateUuids: [String]
    amountFrom: Float
    amountTo: Float
    countries: [String]
    creationTimeFrom: String
    creationTimeTo: String
    currency: String
    firstTimeDeposit: Boolean
    desks: [String]
    modificationTimeFrom: String
    modificationTimeTo: String
    paymentAggregator: String
    paymentMethods: [String]
    bankName: String
    platformType: String
    profileId: String
    requestId: String
    searchParam: String
    statuses: [String]
    statusChangedTimeFrom: String
    statusChangedTimeTo: String
    teams: [String]
    type: String
    page: Page__Input
    paymentTypes: [String]
    warnings: [String]
  }
`;
