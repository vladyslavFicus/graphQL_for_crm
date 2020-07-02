const { gql } = require('apollo-server-express');

module.exports = gql`
  type TradingAccountMutation {
    create(
      accountType: String!
      amount: Float
      currency: String!
      name: String!
      password: String!
      platformType: String!
      profileId: String!
    ): Boolean

    update(
      accountUUID: String!
      currency: String
      mode: String
      name: String
      profileId: String!
      readOnly: Boolean
    ): Boolean

    changePassword(
      accountUUID: String!
      password: String!
      profileUUID: String!
    ): Boolean

    changeLeverage(
      accountUUID: String!
      leverage: Int!
    ): Boolean

    approveChangingLeverage(accountUUID: String!): Boolean
    rejectChangingLeverage(accountUUID: String!): Boolean
  }
`;
