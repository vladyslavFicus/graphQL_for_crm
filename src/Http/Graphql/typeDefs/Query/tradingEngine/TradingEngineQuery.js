const { gql } = require('apollo-server-express');

module.exports = gql`
  type TradingEngineQuery {
    symbols(args: TradingEngineSymbols__Input): TradingEngineSymbolSearch! @pageable
    symbol(symbolName: String!): TradingEngineSymbol
    symbolsSources: [TradingEngineSymbolSource!]!
    securities: [TradingEngineSecurity!]!
    security(securityName: String!): TradingEngineSecurity
    orders(args: TradingEngineOrdersSearch__Input): TradingEngineOrder! @pageable
    accounts(args: TradingEngineAccountSearch__Input): TradingEngineAccount @pageable
  }
`;
