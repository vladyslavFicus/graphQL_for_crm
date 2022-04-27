const { gql } = require('apollo-server-express');

module.exports = gql`
  enum TradingEngine__OrderStatuses__Enum {
    OPEN
    CLOSED
    PENDING
    CANCELED
  }
`;
