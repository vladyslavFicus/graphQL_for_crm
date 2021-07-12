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
      submittedPrice: Float
      stopLoss: Float
      takeProfit: Float
      comment: String
      pendingOrder: Boolean!
    ): Boolean
  }
`;
