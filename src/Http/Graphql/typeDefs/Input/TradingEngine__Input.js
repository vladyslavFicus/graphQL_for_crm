const { gql } = require('apollo-server-express');

module.exports = gql`
  input TradingEngineSearch__Time__Input {
    from: String
    to: String
  }

  input TradingEngineSearch__Input {
    keyword: String
    orderType: String
    accountUuid: String
    symbol: String
    openingDateRange: TradingEngineSearch__Time__Input
    closingDateRange: TradingEngineSearch__Time__Input
    orderId: Int
    enabled: Boolean
    page: Page__Input
    orderStatuses: [String]
    groups: [String]
  }
  
  input TradingEngineTransactionSearch__Input {
    keyword: String
    accountUuid: String
    accountLogin: Int
    transactionType: String
    creationDateRange: TradingEngineSearch__Time__Input
    openingDateRange: TradingEngineSearch__Time__Input
    page: Page__Input
  }
  
  input TradingEngineHistorySearch__Input {
    keyword: String
    accountUuid: String
    symbol: String
    type: String
    accountLogin: Int
    page: Page__Input
    openingDateRange: TradingEngineSearch__Time__Input
    closingDateRange: TradingEngineSearch__Time__Input
  }
  
  input TradingEngineEditOrderAdmin__Input {
    orderId: Int!
    openPrice: Float
    stopLoss: Float
    takeProfit: Float
    comment: String
    type: String
    symbol: String
    reason: String
    commission: Float
    swaps: Float
    volume: Float
    closePrice: Float
    openTime: String
    closeTime: String
  }
  
  input TradingEngineCreateSymbolAdmin__Filtration__Input {
    filterSmoothing: Int!
    discardFiltrationLevel: Int!
    softFilter: Int!
    softFiltrationLevel: Int!
    hardFilter: Int!
    hardFiltrationLevel: Int!
  }
  
  input TradingEngineCreateSymbolAdmin__SwapsConfigs__Input {
    enable: Boolean!
    type: TradingEngine__SwapTypes__Enum
    long: Float!
    short: Float!
    rollover: TradingEngine__DaysOfWeek__Enum!
  }
  
  input TradingEngineCreateSymbolAdmin__SymbolSessionsTime__Input {
    openTime: String
    closeTime: String
  }
  
  input TradingEngineCreateSymbolAdmin__SymbolSessions__Input {
    dayOfWeek: TradingEngine__DaysOfWeek__Enum!
    quote: TradingEngineCreateSymbolAdmin__SymbolSessionsTime__Input
    trade: TradingEngineCreateSymbolAdmin__SymbolSessionsTime__Input
  }
  
  input TradingEngineCreateSymbolAdmin__Input {
    symbol: String!
    source: String!
    digits: Int!
    description: String!
    securityName: String!
    bidSpread: Int!
    askSpread: Int!
    stopsLevel: Int!
    lotSize: Int!
    percentage: Int!
    baseCurrency: String!
    quoteCurrency: String!
    symbolType: TradingEngine__SymbolTypes__Enum!
    filtration: TradingEngineCreateSymbolAdmin__Filtration__Input!
    swapConfigs: TradingEngineCreateSymbolAdmin__SwapsConfigs__Input!
    backgroundColor: String!
    symbolSessions: [TradingEngineCreateSymbolAdmin__SymbolSessions__Input]!
  }
  
  input TradingEngineSymbols__Input {
    symbolNames: [String]
    page: Page__Input
  }

  input TradingEngineGroupsSearch__Input {
    keyword: String
    page: Page__Input
  }

  input TradingEngineGroup__GroupSecurity__Input {
    securityId: Int
    show: Boolean
    spreadDiff: Int
    lotMin: Float
    lotMax: Float
    lotStep: Float
    commissionBase: Float
    commissionType: Commission__Type__Enum
    commissionLots: Commission__Lots__Enum
  }

  input TradingEngineGroup__GroupMargins__Input {
    symbol: String
    swapShort: Float
    swapLong: Float
    percentage: Int
  }
  
  input TradingEngineCreateGroupAdmin__Input {
    groupName: String!
    currency: String!
    description: String
    enable: Boolean
    defaultLeverage: Int
    useSwap: Boolean
    hedgeProhibited: Boolean
    archivePeriodDays: Int
    archiveMaxBalance: Int
    marginCallLevel: Int
    stopoutLevel: Int
    groupSecurities: [TradingEngineGroup__GroupSecurity__Input]
    groupMargins: [TradingEngineGroup__GroupMargins__Input]
  }

  input TradingEngineEditGroupAdmin__Input {
    groupName: String!
    description: String
    enable: Boolean
    defaultLeverage: Int
    useSwap: Boolean
    hedgeProhibited: Boolean
    archivePeriodDays: Int
    archiveMaxBalance: Int
    marginCallLevel: Int
    stopoutLevel: Int
    groupSecurities: [TradingEngineGroup__GroupSecurity__Input]
    groupMargins: [TradingEngineGroup__GroupMargins__Input]
  }
`;
