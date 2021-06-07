const { gql } = require('apollo-server-express');

module.exports = gql`  
  type TradingEngineOrder {
    id: ID,
    login: Int,
    tradeId: String,
    symbol: String,
    symbolAlias: String
    direction: String
    digits: Int
    takeProfit: Float
    stopLoss: Float
    openPrice: Float
    closePrice: Float
    marginRate: Float
    volumeUnits: Float
    volumeLots: Float
    lotSize: Float
    commission: Float
    swaps: Float
    pnl: Float
    time: Float
    tradeType: String
    comment: String
    tradeStatus: String
    originalAgent: Operator
    operationType: TradingEngine__OperationTypes__Enum
  }
`;
