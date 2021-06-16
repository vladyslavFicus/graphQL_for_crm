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
  }
`;
