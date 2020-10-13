const { gql } = require('apollo-server-express');

module.exports = gql`
  type DistributionRuleMutation {
    migration(uuid: String!): Boolean
    create(ruleName: String!, ruleOrder: Int!): Boolean
    update(ruleName: String, ruleOrder: Int, uuid: String!): Boolean
  }
`;
