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
      autoOpenPrice: Boolean!
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
    
    updateAccount(
      accountUuid: String!
      group: String
      readOnly: Boolean
      leverage: Int
    ): TradingEngineAccount
  }
`;
