const { gql } = require('apollo-server-express');

module.exports = gql`
  input DistributionRuleUpdate__Unit__Input {
    quantity: Int
    baseUnit: String
  }

  input DistributionRuleUpdate__SourceBrand__Input {
    brand: String
    distributionUnit: DistributionRuleUpdate__Unit__Input
    sortType: String
  }

  input DistributionRuleUpdate__TargetBrand__Input {
    brand: String
    distributionUnit: DistributionRuleUpdate__Unit__Input
    source: String
    operator: String
    country: String
  }

  input DistributionRule__RegistrationDateRange__Input {
    from: String
    to: String
  }

  input DistributionRuleUpdate__Input {
    uuid: String!
    ruleName: String
    salesStatuses: [String]
    targetSalesStatus: String
    countries: [String]
    languages: [String]
    registrationPeriodInHours: Int
    registrationDateRange: DistributionRule__RegistrationDateRange__Input
    executionPeriodInHours: Int
    executionType: String
    sourceBrandConfig: DistributionRuleUpdate__SourceBrand__Input
    targetBrandConfig: DistributionRuleUpdate__TargetBrand__Input
    affiliateUuids: [String]
    firstTimeDeposit: Boolean
  }
`;
