const { gql } = require('apollo-server-express');

module.exports = gql`
  enum TradingEngine__SymbolTypes__Enum {
    FOREX
    CFD
  }
`;
