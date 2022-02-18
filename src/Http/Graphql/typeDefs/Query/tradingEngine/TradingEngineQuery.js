const { gql } = require('apollo-server-express');

module.exports = gql`
  type TradingEngineQuery {
    account(identifier: String): TradingEngineAccount
    symbols(args: TradingEngineSymbols__Input): TradingEngineSymbolSearch! @pageable
    symbol(symbolName: String!): TradingEngineSymbol
    symbolsSources: [TradingEngineSymbolSource!]!
    securities: [TradingEngineSecurity!]!
    security(securityName: String!): TradingEngineSecurity
    group(groupName: String!): TradingEngineGroup
    groups(args: TradingEngineGroupsSearch__Input): TradingEngineGroup! @pageable
    orders(args: TradingEngineOrdersSearch__Input): TradingEngineOrder! @pageable
    accounts(args: TradingEngineAccountSearch__Input): TradingEngineAccount! @pageable
    accountSymbols(accountUuid: String!): [TradingEngineAccountSymbol!]!
    accountStatistic(accountUuid: String!): TradingEngineAccountStatistic!
    transactions(args: TradingEngineTransactionSearch__Input): TradingEngineTransaction @pageable
  }
`;
