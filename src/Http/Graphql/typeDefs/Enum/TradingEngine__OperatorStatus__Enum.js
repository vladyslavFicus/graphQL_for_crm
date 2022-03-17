const { gql } = require('apollo-server-express');

module.exports = gql`
  enum TradingEngine__OperatorStatuses__Enum {
    ACTIVE
    INACTIVE
    CLOSED
  }
`;
