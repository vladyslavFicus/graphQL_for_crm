const { gql } = require('apollo-server-express');

module.exports = gql`  
  type TradingEngineAccount {
    _id: ID!
    uuid: String!
    profileUuid: String!
    serverId: Int
    login: Int!
    accountType: TradingEngine__AccountTypes__Enum!
    enable: Boolean!
    readOnly: Boolean!
    leverage: Int!
    group: String!
    groupEntity: TradingEngineGroup!
    name: String
    balance: Float
    credit: Float
    margin: Float
    freeMargin: Float
    marginLevel: Float!
    equity: Float
    comment: String
    currency: String!
    registrationDate: String!
  }
`;
