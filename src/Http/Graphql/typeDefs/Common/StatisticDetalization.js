const { gql } = require('apollo-server-express');

module.exports = gql`
  enum StatisticDetalization {
    PER_DAYS
    PER_HOURS
    PER_MINUTES
  }
`;
