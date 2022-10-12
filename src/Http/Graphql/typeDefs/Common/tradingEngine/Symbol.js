const { gql } = require('apollo-server-express');

module.exports = gql`
  type TradingEngineSymbol__Filtration {
    filterSmoothing: Int!
    discardFiltrationLevel: Int!
    softFilter: Int!
    softFiltrationLevel: Int!
    hardFilter: Int!
    hardFiltrationLevel: Int!
  }
  
  type TradingEngineSymbol__SwapsConfigsSwapDayTimes {
    dayOfWeek: TradingEngine__DaysOfWeek__Enum!
    multiplier: Int!
    swapTime: String!
  }

  type TradingEngineSymbol__SwapsConfigs {
    enable: Boolean!
    type: TradingEngine__SwapTypes__Enum
    long: Float!
    short: Float!
    swapDayTimes: [TradingEngineSymbol__SwapsConfigsSwapDayTimes!]!
  }
  
  type TradingEngineSymbol__SymbolSessionsTime {
    openTime: String!
    closeTime: String!
  }
  
  type TradingEngineSymbol__SymbolSessions {
    dayOfWeek: TradingEngine__DaysOfWeek__Enum!
    periods: [TradingEngineSymbol__SymbolSessionsTime!]!
  }
  
  type TradingEngineSymbol {
    symbol: String!
    source: String
    sourceSymbol: TradingEngineSymbol
    digits: Int!
    description: String!
    securityName: String!
    bidSpread: Float!
    askSpread: Float!
    stopsLevel: Int!
    lotSize: Int!
    percentage: Float!
    baseCurrency: String
    quoteCurrency: String!
    symbolType: TradingEngine__SymbolTypes__Enum!
    filtration: TradingEngineSymbol__Filtration!
    swapConfigs: TradingEngineSymbol__SwapsConfigs!
    backgroundColor: String!
    symbolSessions: [TradingEngineSymbol__SymbolSessions!]!
    config(accountUuid: String): TradingEngineAccountSymbolConfig
    prices(size: Int): [TradingEngineSymbolPrice!]! 
    currentHolidays: [TradingEngineHoliday!]!
    lotMin: Float
    lotMax: Float
    lotStep: Float
    defaultFiltration: Boolean
  }
`;
