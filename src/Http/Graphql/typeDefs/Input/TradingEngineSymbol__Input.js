const { gql } = require('apollo-server-express');

module.exports = gql`
  input TradingEngineEditSymbolAdmin__Filtration__Input {
    filterSmoothing: Int!
    discardFiltrationLevel: Int!
    softFilter: Int!
    softFiltrationLevel: Int!
    hardFilter: Int!
    hardFiltrationLevel: Int!
  }
  
  input TradingEngineEditSymbolAdmin__SwapsConfigs__Input {
    enable: Boolean!
    type: TradingEngine__SwapTypes__Enum
    long: Float!
    short: Float!
    rollover: TradingEngine__DaysOfWeek__Enum!
  }
  
  input TradingEngineEditSymbolAdmin__SymbolSessions__Input {
    dayOfWeek: TradingEngine__DaysOfWeek__Enum!
    quote: TradingEngineCreateSymbolAdmin__SymbolSessionsTime__Input
    trade: TradingEngineCreateSymbolAdmin__SymbolSessionsTime__Input
  }

  input TradingEngineEditSymbolAdmin__Input {
    symbol: String!
    source: String
    digits: Int!
    description: String!
    securityName: String!
    bidSpread: Float!
    askSpread: Float!
    stopsLevel: Int!
    lotSize: Int!
    percentage: Int!
    baseCurrency: String
    quoteCurrency: String!
    symbolType: TradingEngine__SymbolTypes__Enum!
    filtration: TradingEngineEditSymbolAdmin__Filtration__Input!
    swapConfigs: TradingEngineEditSymbolAdmin__SwapsConfigs__Input!
    backgroundColor: String!
    symbolSessions: [TradingEngineEditSymbolAdmin__SymbolSessions__Input]!
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
    source: String
    digits: Int!
    description: String!
    securityName: String!
    bidSpread: Float!
    askSpread: Float!
    stopsLevel: Int!
    lotSize: Int!
    percentage: Int!
    baseCurrency: String
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
`;
