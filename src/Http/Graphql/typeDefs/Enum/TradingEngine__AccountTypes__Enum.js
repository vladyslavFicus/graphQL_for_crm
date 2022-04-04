const { gql } = require('apollo-server-express');

module.exports = gql`
  enum TradingEngine__AccountTypes__Enum {
    DEMO
    LIVE
  }
`;
