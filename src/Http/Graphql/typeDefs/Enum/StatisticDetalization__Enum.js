const { gql } = require('apollo-server-express');

module.exports = gql`
  enum StatisticDetalization__Enum {
    PER_DAYS
    PER_HOURS
    PER_MINUTES
  }
`;
