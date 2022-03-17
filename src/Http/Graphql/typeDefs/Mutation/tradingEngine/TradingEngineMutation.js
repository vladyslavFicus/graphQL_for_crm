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
    ): TradingEngineOrder!
    
    editOrder(
      orderId: Int!
      openPrice: Float
      stopLoss: Float
      takeProfit: Float
      comment: String
    ): Boolean

    editOrderAdmin(args: TradingEngineEditOrderAdmin__Input): Boolean
    
    closeOrder(
      orderId: Int!
      volume: Float
      closePrice: Float
    ): Boolean
    
    cancelOrder(orderId: Int!): Boolean

    reopenOrder(orderId: Int!): Boolean

    activatePendingOrder(
      orderId: Int!
      activationPrice: Float!
    ): Boolean
    
    updateAccountGroup(
      accountUuid: String!
      group: String
      force: Boolean
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

    createSecurity(name: String! description: String): Boolean
    
    editSecurity(name: String! description: String securityName: String!): Boolean

    restartStreaming: String
    
    setAccountArchiveStatus(uuid: String! enabled: Boolean!): Boolean

    createOperator(args: TradingEngineCreateOperator__Input): TradingEngineOperator!
  }
`;
