const { gql } = require('apollo-server-express');

module.exports = gql`
  type ReferrerStatistics {
    referralsCount: Int
    ftdCount: Int
    remunerationTotalAmount: Float
  }
`;
