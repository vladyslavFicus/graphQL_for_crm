const { gql } = require('apollo-server-express');

module.exports = gql`
  type DistributionRuleMutation {
    migration(uuid: String!): Boolean
    clientsAmount(uuid: String!): DistributionRuleClientsAmount
  }
`;
