const { gql } = require('apollo-server-express');

module.exports = gql`
  type DistributionRuleMutation {
    distributionRuleMigration(uuid: String!): Boolean
    distributionRuleClientsAmount(uuid: String!): DistributionRuleClientsAmount
    updateRule(args: DistributionRuleUpdate__Input): Boolean
  }
`;
