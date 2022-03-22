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
    order(orderId: Int!): TradingEngineOrder!
    accounts(args: TradingEngineAccountSearch__Input): TradingEngineAccount! @pageable
    accountSymbols(accountUuid: String!): [TradingEngineAccountSymbol!]!
    accountStatistic(accountUuid: String!): TradingEngineAccountStatistic!
    transactions(args: TradingEngineTransactionSearch__Input): TradingEngineTransaction @pageable
    history(args: TradingEngineHistorySearch__Input): TradingEngineHistory! @pageable
    operator(uuid: String!): TradingEngineOperator!
    operators(args: TradingEngineOperatorSearch__Input!): TradingEngineOperator! @pageable
    operatorAccessData: OperatorAccess!
    holidays(args: TradingEngineHolidays__Input): TradingEngineHoliday! @pageable
  }
`;
