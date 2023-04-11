const { gql } = require('apollo-server-express');

module.exports = gql`
  type TradingAccount__Affiliate {
    source: String
  }

  type TradingAccount__LastLeverageChangeRequest {
    changeLeverageFrom: String
    changeLeverageTo: String
    createDate: String
    status: String
  }

  type TradingAccount__Profile {
    fullName: String
    uuid: String!
  }

  type TradingAccount {
    accountType: String!
    accountUUID: String!
    affiliate: TradingAccount__Affiliate
    archived: Boolean!
    balance: Float!
    brandId: String
    closedTradeAmount: Float
    closedTradeProfit: Float
    createdAt: String
    createdBy: String
    credit: Float!
    currency: String
    equity: Float
    group: String!
    lastLeverageChangeRequest: TradingAccount__LastLeverageChangeRequest
    leverage: Int!
    login: Int!
    margin: Float
    name: String
    operator: Operator
    platformType: String!
    profile: TradingAccount__Profile
    profileUUID: String
    readOnly: Boolean
    readOnlyUpdateTime: String
    readOnlyUpdatedBy: String
    serverId: Int
  }
`;
