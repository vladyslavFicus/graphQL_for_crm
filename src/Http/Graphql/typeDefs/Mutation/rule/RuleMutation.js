const { gql } = require('apollo-server-express');

module.exports = gql`
  type RuleMutation {
    createRule(
      actions: [RuleActions__Input]!
      affiliateUUIDs: [String]
      countries: [String]
      languages: [String]
      name: String!
      priority: Int!
      sources: [String]
      type: Rule__Type__Enum
      uuid: String
    ): Rule

    createRuleRetention(
      actions: [RuleActions__Input]!
      countries: [String]
      depositAmountFrom: Int!
      depositAmountTo: Int!
      depositCount: Int
      languages: [String]
      name: String!
      priority: Int!
      uuid: String
    ): Rule

    deleteRule(uuid: String!): Boolean

    deleteRuleRetention(uuid: String!): Boolean
  }
`;
