const { gql } = require('apollo-server-express');

module.exports = gql`
  type TradingEngineAdminSymbol__Filtration {
    filterSmoothing: Int!
    discardFiltrationLevel: Int!
    softFilter: Int!
    softFiltrationLevel: Int!
    hardFilter: Int!
    hardFiltrationLevel: Int!
  }
  
  type TradingEngineAdminSymbol__SwapsConfigs {
    enable: Boolean!
    type: TradingEngine__SwapTypes__Enum
    long: Float!
    short: Float!
    rollover: TradingEngine__DaysOfWeek__Enum!
  }
  
  type TradingEngineAdminSymbol__SymbolSessionsTime {
    openTime: String
    closeTime: String
  }
  
  type TradingEngineAdminSymbol__SymbolSessions {
    dayOfWeek: TradingEngine__DaysOfWeek__Enum!
    quote: TradingEngineAdminSymbol__SymbolSessionsTime
    trade: TradingEngineAdminSymbol__SymbolSessionsTime
  }
  
  type TradingEngineAdminSymbol {
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
    filtration: TradingEngineAdminSymbol__Filtration!
    swapConfigs: TradingEngineAdminSymbol__SwapsConfigs!
    backgroundColor: String!
    symbolSessions: [TradingEngineAdminSymbol__SymbolSessions]
  }
`;
