const { gql } = require('apollo-server-express');

module.exports = gql`
  input DistributionRuleSearch__Input {
    page: Int
    size: Int
    searchParam: String
    languages: [String]
    countries: [String]
    ruleStatus: String
    fromBrand: String
    toBrand: String
    salesStatuses: [String]
    createdDateFrom: String
    createdDateTo: String
    lastTimeExecutedFrom: String
    lastTimeExecutedTo: String
    executionPeriodsInHours: [Int]
    affiliateUuids: [String]
    firstTimeDeposit: Boolean
  }
`;
