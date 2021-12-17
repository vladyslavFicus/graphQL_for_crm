const { gql } = require('apollo-server-express');

module.exports = gql`
  enum TradingEngine__SwapTypes__Enum {
    POINTS
    MONEY_IN_BASE_CURRENCY
    INTEREST_OPEN_PRICE
  }
`;
