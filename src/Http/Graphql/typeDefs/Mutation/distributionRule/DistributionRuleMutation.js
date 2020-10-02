const { gql } = require('apollo-server-express');

module.exports = gql`
  type DistributionRuleMutation {
    distributionRuleMigration(uuid: String!): Boolean
  }
`;
