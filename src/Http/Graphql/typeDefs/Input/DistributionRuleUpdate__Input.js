const { gql } = require('apollo-server-express');

module.exports = gql`
  input DistributionRuleUpdate__Unit__Input {
    quantity: Int
    baseUnit: String
  }

  input DistributionRuleUpdate__SourceBrand__Input {
    brand: String
    salesStatuses: [String]
    countries: [String]
    languages: [String]
    firstTimeDeposit: Boolean
    timeInCurrentStatusInHours: Int
    registrationPeriodInHours: Int
    registrationDateRange: DistributionRule__DateRange__Input
    lastNotePeriodInHours: Int
    lastNoteDateRange: DistributionRule__DateRange__Input
    affiliateUuids: [String]
    distributionUnit: DistributionRuleUpdate__Unit__Input
    sortType: String
    desks: [String]
    teams: [String]
  }

  input DistributionRuleUpdate__TargetBrand__Input {
    brand: String
    targetSalesStatus: String
    copyAffiliateSource: Boolean
    distributionUnit: DistributionRuleUpdate__Unit__Input
    affiliateUuid: String
    operator: String
    country: String
  }

  input DistributionRule__DateRange__Input {
    from: String
    to: String
  }

  input DistributionRuleUpdate__Input {
    uuid: String!
    ruleName: String
    executionType: String
    sourceBrandConfig: DistributionRuleUpdate__SourceBrand__Input
    targetBrandConfig: DistributionRuleUpdate__TargetBrand__Input
  }
`;
