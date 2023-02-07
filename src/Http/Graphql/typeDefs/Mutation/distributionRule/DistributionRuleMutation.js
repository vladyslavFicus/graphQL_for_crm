const { gql } = require('apollo-server-express');

module.exports = gql`
  type DistributionRuleMutation {
    distributionRuleMigration(uuid: String!): Boolean
    updateRule(args: DistributionRuleUpdate__Input): DistributionRule!
    migration(uuid: String!): Boolean
    create(ruleName: String!, ruleOrder: Int!): DistributionRule!
    update(ruleName: String, ruleOrder: Int, uuid: String!): DistributionRule!
    updateRuleStatus(uuid: String!, ruleStatus: String!): DistributionRule!
    updateRuleDaysOfWeek(uuid: String!, executionDaysOfWeek: [String!]!): DistributionRule!
  }
`;
