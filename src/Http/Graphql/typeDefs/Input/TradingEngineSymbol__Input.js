const { gql } = require('apollo-server-express');

module.exports = gql`
  input TradingEngineEditSymbol__Filtration__Input {
    filterSmoothing: Int!
    discardFiltrationLevel: Int!
    softFilter: Int!
    softFiltrationLevel: Int!
    hardFilter: Int!
    hardFiltrationLevel: Int!
  }
  
  input TradingEngineEditSymbol__SwapsConfigs__Input {
    enable: Boolean!
    type: TradingEngine__SwapTypes__Enum
    long: Float!
    short: Float!
    swapDayTimes: [TradingEngineSymbol__SwapsConfigsSwapDayTimes__Input]
  }
  
  input TradingEngineEditSymbol__SymbolSessions__Input {
    dayOfWeek: TradingEngine__DaysOfWeek__Enum!
    periods: [TradingEngineCreateSymbol__SymbolSessionsTime__Input]
  }

  input TradingEngineSymbol__SwapsConfigsSwapDayTimes__Input {
    dayOfWeek: TradingEngine__DaysOfWeek__Enum!
    multiplier: Int!
    swapTime: String!
  }

  input TradingEngineEditSymbol__Input {
    symbol: String!
    source: String
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
    filtration: TradingEngineEditSymbol__Filtration__Input!
    swapConfigs: TradingEngineEditSymbol__SwapsConfigs__Input!
    backgroundColor: String!
    symbolSessions: [TradingEngineEditSymbol__SymbolSessions__Input!]!
    force: Boolean
    lotMin: Float!
    lotStep: Float!
    lotMax: Float!
    defaultFiltration: Boolean!
  }
  
  input TradingEngineCreateSymbol__Filtration__Input {
    filterSmoothing: Int!
    discardFiltrationLevel: Int!
    softFilter: Int!
    softFiltrationLevel: Int!
    hardFilter: Int!
    hardFiltrationLevel: Int!
  }
  
  input TradingEngineCreateSymbol__SwapsConfigs__Input {
    enable: Boolean!
    type: TradingEngine__SwapTypes__Enum
    long: Float!
    short: Float!
    rollover: TradingEngine__DaysOfWeek__Enum
  }
  
  input TradingEngineCreateSymbol__SymbolSessionsTime__Input {
    openTime: String!
    closeTime: String!
  }
  
  input TradingEngineCreateSymbol__SymbolSessions__Input {
    dayOfWeek: TradingEngine__DaysOfWeek__Enum!
    quote: TradingEngineCreateSymbol__SymbolSessionsTime__Input
    trade: TradingEngineCreateSymbol__SymbolSessionsTime__Input
  }
  
  input TradingEngineCreateSymbol__Input {
    symbol: String!
    source: String
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
    defaultFiltration: Boolean!
    symbolType: TradingEngine__SymbolTypes__Enum!
    filtration: TradingEngineCreateSymbol__Filtration__Input!
    swapConfigs: TradingEngineCreateSymbol__SwapsConfigs__Input!
    backgroundColor: String!
    symbolSessions: [TradingEngineCreateSymbol__SymbolSessions__Input]!
    lotMin: Float!
    lotMax: Float!
    lotStep: Float!
  }
  
  input TradingEngineSymbols__Input {
    symbolNames: [String]
    securityNames: [String]
    favorite: Boolean
    page: Page__Input
  }
`;
