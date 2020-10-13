const { gql } = require('apollo-server-express');

module.exports = gql`  
  type DistributionRule__LatestMigration {
    uuid: String
    startDate: String
    clientsAmount: String
    status: String
    ruleUuid: String
  }
  
  type DistributionRule__BrandConfigs {
    uuid: String
    brand: String
    sortType: String
    operator: String
    country: String
    distributionUnit: DistributionRule__DistributionUnit
  }
  
  type DistributionRule__DistributionUnit {
    quantity: Int
    baseUnit: String
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
    countries: [String]
    salesStatuses: [String]
    targetSalesStatus: String
    registrationPeriodInHours: Int
    executionType: String
    executionPeriodInHours: Int
    latestMigration: DistributionRule__LatestMigration
    sourceBrandConfigs: [DistributionRule__BrandConfigs]
    targetBrandConfigs: [DistributionRule__BrandConfigs]
  }
  
  type DistributionRuleClientsAmount {
     clientsAmount: Int
  }
`;
