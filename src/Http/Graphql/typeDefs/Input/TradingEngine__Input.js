const { gql } = require('apollo-server-express');

module.exports = gql`
  input TradingEngineSearch__Time__Input {
    from: String
    to: String
  }

  input TradingEngineOrdersSearch__Input {
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
  
  input TradingEngineGroupsSearch__Input {
    enabled: Boolean
    keyword: String
    page: Page__Input
  }

  input TradingEngineOrderAccountBulkClose__OrderInput {
    id: Int!
    closePrice: Float
  }

  input TradingEngineOrderAccountBulkClose__Input {
    orders: [TradingEngineOrderAccountBulkClose__OrderInput!]!
  }

  input TradingEngineGroup__GroupSecurity__Input {
    securityId: Int!
    show: Boolean
    defaultLots: Boolean!
    spreadDiff: Int
    lotMin: Float!
    lotMax: Float!
    lotStep: Float!
    commissionBase: Float!
    commissionType: Commission__Type__Enum!
    commissionLots: Commission__Lots__Enum!
  }

  input TradingEngineGroup__GroupSymbol__Input {
    symbol: String!
    swapShort: Float!
    swapLong: Float!
    percentage: Float!
    enabled: Boolean!
  }
  
  input TradingEngineCreateGroup__Input {
    groupName: String!
    currency: String!
    description: String
    accountCreationAllowed: Boolean!
    defaultLeverage: Int!
    useSwap: Boolean!
    hedgeProhibited: Boolean!
    archivePeriodDays: Int!
    archiveMaxBalance: Int!
    archivationEnabled: Boolean!
    marginCallLevel: Int!
    enabled: Boolean!
    stopoutLevel: Int!
    groupSecurities: [TradingEngineGroup__GroupSecurity__Input!]!
    groupSymbols: [TradingEngineGroup__GroupSymbol__Input!]!
  }

  input TradingEngineEditGroup__Input {
    groupName: String!
    description: String
    accountCreationAllowed: Boolean!
    defaultLeverage: Int!
    useSwap: Boolean!
    hedgeProhibited: Boolean!
    archivePeriodDays: Int!
    archiveMaxBalance: Int!
    archivationEnabled: Boolean!
    marginCallLevel: Int!
    stopoutLevel: Int!
    enabled: Boolean!
    groupSecurities: [TradingEngineGroup__GroupSecurity__Input!]!
    groupSymbols: [TradingEngineGroup__GroupSymbol__Input!]!
    force: Boolean
  }
  
  input TradingEngineAccountSearch__Input {
    keyword: String
    orderType: String
    accountUuid: String
    symbol: String
    openingDateRange: TradingEngineSearch__Time__Input
    closingDateRange: TradingEngineSearch__Time__Input
    registrationDateRange: TradingEngineSearch__Time__Input
    orderId: Int
    enabled: Boolean
    page: Page__Input
    orderStatuses: [String]
    groups: [String]
  }
`;
