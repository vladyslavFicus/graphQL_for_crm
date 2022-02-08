const { gql } = require('apollo-server-express');

module.exports = gql`
  type TradingEngineQuery {
    symbols(args: TradingEngineSymbols__Input): TradingEngineSymbolSearch! @pageable
  }
`;
