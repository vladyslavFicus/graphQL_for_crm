const { gql } = require('apollo-server-express');

module.exports = gql`
  type DistributionRule__LatestMigration {
    uuid: String
    startDate: String
    clientsAmount: String
    status: String
    ruleUuid: String
  }

  type DistributionRule__SourceBrandConfig {
    uuid: String
    brand: String
    affiliateUuids: [String]
    sortType: String
    operator: String
    operatorEntity: Operator
    country: String
    distributionUnit: DistributionRule__DistributionUnit
    desks: [String]
    teams: [String]
  }

  type DistributionRule__TargetBrandConfig {
      uuid: String
      brand: String
      sortType: String
      copyAffiliateSource: Boolean
      affiliateUuid: String
      operator: String
      operatorEntity: Operator
      country: String
      distributionUnit: DistributionRule__DistributionUnit
      desks: [String]
      teams: [String]
  }

  type DistributionRule__DistributionUnit {
    quantity: Int
    baseUnit: String
  }

  type DistributionRule__DateRange {
    from: String
    to: String
  }

  type DistributionRule {
    _id: ID!
    uuid: String!
    name: String
    order: Int
    status: String
    createdBy: String
    statusChangedAt: String
    createdAt: String
    updatedAt: String
    countries: [String]
    languages: [String]
    salesStatuses: [String]
    targetSalesStatus: String
    registrationPeriodInHours: Int
    registrationDateRange: DistributionRule__DateRange
    lastNotePeriodInHours: Int
    lastNoteDateRange: DistributionRule__DateRange
    executionType: String
    executionPeriodInHours: Int
    latestMigration: DistributionRule__LatestMigration
    sourceBrandConfigs: [DistributionRule__SourceBrandConfig]
    targetBrandConfigs: [DistributionRule__TargetBrandConfig]
    firstTimeDeposit: Boolean
  }
`;
