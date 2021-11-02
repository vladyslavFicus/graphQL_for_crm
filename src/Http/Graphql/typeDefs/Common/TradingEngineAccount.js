const { gql } = require('apollo-server-express');

module.exports = gql`  
  type TradingEngineAccount {
    _id: ID!
    uuid: String!
    profileUuid: String
    profileFullName: String
    serverId: Int
    login: Int
    accountType: String
    enable: Boolean
    readOnly: Boolean
    leverage: Int
    group: String
    name: String
    balance: Float
    credit: Float
    margin: Float
    freeMargin: Float
    equity: Float
    comment: String
    currency: String
    registrationDate: String
    allowedSymbols: [TradingEngineAccountSymbol]
  }
`;
