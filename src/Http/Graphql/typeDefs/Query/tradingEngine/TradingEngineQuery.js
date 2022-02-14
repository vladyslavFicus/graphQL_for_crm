const { gql } = require('apollo-server-express');

module.exports = gql`
  type TradingEngineQuery {
    symbols(args: TradingEngineSymbols__Input): TradingEngineSymbolSearch! @pageable
    symbolsSources: [TradingEngineSymbolSource!]!
    symbol(symbolName: String!): TradingEngineSymbol
    securities: [TradingEngineSecurity!]!
    security(securityName: String!): TradingEngineSecurity
    orders(args: TradingEngineOrdersSearch__Input): TradingEngineOrder! @pageable
  }
`;
