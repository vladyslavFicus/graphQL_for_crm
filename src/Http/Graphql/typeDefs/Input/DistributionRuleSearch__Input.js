const { gql } = require('apollo-server-express');

module.exports = gql`
  input DistributionRuleSearch__Input {
    page: Int
    size: Int
    searchParam: String
    ruleStatus: String
    fromBrand: String
    toBrand: String
    salesStatus: String
    createdDateFrom: String
    createdDateTo: String
    lastTimeExecutedFrom: String
    lastTimeExecutedTo: String
    executionPeriodInHours: Int
  }
`;
