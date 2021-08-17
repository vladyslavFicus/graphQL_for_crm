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

    rename(
      accountUUID: String!
      name: String!
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

    toggleDisabled(
      accountUUID: String!
      readOnly: Boolean!
    ): Boolean

    approveChangingLeverage(accountUUID: String!): Boolean
    rejectChangingLeverage(accountUUID: String!): Boolean
  }
`;
