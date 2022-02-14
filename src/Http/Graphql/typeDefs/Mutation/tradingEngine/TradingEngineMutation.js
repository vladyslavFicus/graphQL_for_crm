const { gql } = require('apollo-server-express');

module.exports = gql`
  type TradingEngineMutation {
    createCreditIn(
      amount: Float!
      comment: String
      accountUuid: String!
    ): TradingEngineCredit

    createCreditOut(
      amount: Float!
      comment: String
      accountUuid: String!
    ): TradingEngineCredit
    
    createOrder(
      accountUuid: String!
      symbol: String!
      volumeLots: Float!
      type: String!
      direction: String!
      openPrice: Float
      stopLoss: Float
      takeProfit: Float
      comment: String
    ): TradingEngineOrder
    
    editOrder(
      orderId: Int!
      openPrice: Float
      stopLoss: Float
      takeProfit: Float
      comment: String
    ): Boolean
    
    closeOrder(
      orderId: Int!
      volume: Float
      closePrice: Float
    ): Boolean
    
    deleteOrder(
      orderId: Int!
    ): Boolean

    activatePendingOrder(
      orderId: Int!
      activationPrice: Float!
    ): Boolean
    
    updateAccountGroup(
      accountUuid: String!
      group: String
    ): TradingEngineAccount

    updateAccountLeverage(
      accountUuid: String!
      leverage: Int
    ): TradingEngineAccount

    updateAccountReadonly(
      accountUuid: String!
      readOnly: Boolean
    ): TradingEngineAccount

    createSymbol(args: TradingEngineCreateSymbol__Input): Boolean

    editSymbol(args: TradingEngineEditSymbol__Input): Boolean
    
    createGroup(args: TradingEngineCreateGroup__Input!): Boolean
    
    editGroup(args: TradingEngineEditGroup__Input!): Boolean
   
    deleteGroup(groupName: String!): Boolean
  }
`;
