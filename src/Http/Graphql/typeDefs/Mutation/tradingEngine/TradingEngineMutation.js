const { gql } = require('apollo-server-express');

module.exports = gql`
  type TradingEngineMutation {
    createCreditIn(
      accountUuid: String!
      amount: Float!
    ): TradingEngineAccount

    createCreditOut(
      accountUuid: String!
      amount: Float!
    ): TradingEngineAccount

    createCorrectionIn(
      accountUuid: String!
      amount: Float!
    ): TradingEngineAccount

    createCorrectionOut(
      accountUuid: String!
      amount: Float!
    ): TradingEngineAccount
    
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

    createClosedOrder(
      accountUuid: String!
      symbol: String!
      volumeLots: Float!
      direction: String!
      openPrice: Float!
      closePrice: Float!
      exchangeRate: Float!
      openTime: String
      commission: Float!
      swaps: Float!
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

    bulkCloseOrders(args: TradingEngineOrderAccountBulkClose__Input!): Boolean
    
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

    deleteSecurity(securityName: String!): Boolean

    restartStreaming: String
    
    setAccountArchiveStatus(uuid: String! enabled: Boolean!): Boolean
    
    deleteSymbol(symbolName: String! force: Boolean): Boolean

    createOperator(args: TradingEngineCreateOperator__Input): TradingEngineOperator!

    updateOperator(uuid: String! args: TradingEngineUpdateOperator__Input!): TradingEngineOperator!

    changeOperatorStatus(
      uuid: String!
      status: TradingEngine__OperatorStatuses__Enum!
      reason: String!
    ): TradingEngineOperator!
    
    changeOperatorRole(uuid: String!, role: TradingEngine__OperatorRoles__Enum!): TradingEngineOperator!
    
    createHoliday(args: TradingEngineCreateHoliday__Input!): TradingEngineHoliday!

    editHoliday(args: TradingEngineEditHoliday__Input!): TradingEngineHoliday!

    deleteHoliday(id: ID!): Boolean
  }
`;
