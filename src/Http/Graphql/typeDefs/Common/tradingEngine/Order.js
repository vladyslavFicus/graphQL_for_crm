const { gql } = require('apollo-server-express');

module.exports = gql`  
  type TradingEngineOrder__Pnl {
    gross: Float!
    net: Float!
  }
  
  type TradingEngineOrder__Time {
    creation: String!,
    modification: String,
    expiration: String,
    closing: String,
  }

  type TradingEngineOrder {
    id: Int!
    accountLogin: Int!
    accountUuid: String!
    account: TradingEngineAccount!
    tradeId: String
    symbol: String!
    symbolAlias: String
    symbolConfig: TradingEngineAccountSymbolConfig
    symbolEntity: TradingEngineSymbol
    direction: String!
    digits: Float!
    takeProfit: Float
    stopLoss: Float
    openPrice: Float!
    closePrice: Float
    marginRate: Float!
    volumeUnits: Float
    volumeLots: Float!
    lotSize: Float
    commission: Float!
    swaps: Float!
    status: TradingEngine__OrderStatuses__Enum!
    pnl: TradingEngineOrder__Pnl!
    time: TradingEngineOrder__Time!
    tradeType: String
    comment: String
    tradeStatus: String
    type: TradingEngine__OperationTypes__Enum!
    group: String
    reason: String!
    openRate: Float
    closeRate: Float
    margin: Float
    leverage: Int
  }
`;
