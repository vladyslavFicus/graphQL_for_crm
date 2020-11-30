const { gql } = require('apollo-server-express');

module.exports = gql`
  type RuleMutation {
    createRule(
      operatorSpreads: [RuleOperatorSpread__Input]
      parentBranch: String
      ruleType: Rule__ActionType__Enum
      affiliateUUIDs: [String]
      countries: [String]
      languages: [String]
      name: String!
      priority: Int!
      sources: [String]
      type: Rule__Type__Enum
      uuid: String
    ): Boolean

    deleteRule(uuid: String!): Boolean
  }
`;
