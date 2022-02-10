const { gql } = require('apollo-server-express');

module.exports = gql`
  type TradingEngineQuery {
    symbols(args: TradingEngineSymbols__Input): TradingEngineSymbolSearch! @pageable
    groups(args: TradingEngineGroupsSearch__Input): TradingEngineGroup! @pageable
  }
`;
