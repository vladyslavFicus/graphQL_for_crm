const { gql } = require('apollo-server-express');

module.exports = gql`
  type DistributionRuleMutation {
    distributionRuleMigration(uuid: String!): Boolean
    distributionRuleClientsAmount(uuid: String!): DistributionRuleClientsAmount
    updateRule(args: DistributionRuleUpdate__Input): Boolean
    migration(uuid: String!): Boolean
    create(ruleName: String!, ruleOrder: Int!): Boolean
    update(ruleName: String, ruleOrder: Int, uuid: String!): Boolean
    updateRuleStatus(uuid: String!, ruleStatus: String!): Boolean
  }
`;
