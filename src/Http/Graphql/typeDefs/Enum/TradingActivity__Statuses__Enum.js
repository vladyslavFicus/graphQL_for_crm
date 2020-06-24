const { gql } = require('apollo-server-express');

module.exports = gql`
  enum TradingActivity__Statuses__Enum {
    OPEN
    CLOSED
    PENDING
  }
`;
