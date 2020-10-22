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
    ): Boolean

    deleteRule(uuid: String!): Boolean
  }
`;
