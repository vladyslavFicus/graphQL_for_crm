const { gql } = require('apollo-server-express');

module.exports = gql`
  enum TradingEngine__SwapTypes__Enum {
    POINTS
    MONEY_IN_ACCOUNT_CURRENCY
    INTEREST_CURRENT_PRICE
  }
`;
