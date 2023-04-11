const { gql } = require('apollo-server-express');

module.exports = gql`
  type AccountView__Affiliate {
    source: String
  }

  type AccountView__Profile {
    fullName: String
    uuid: String!
  }

  type AccountView {
    uuid: String!
    accountType: String!
    affiliate: AccountView__Affiliate
    archived: Boolean
    balance: Float!
    brandId: String
    createdAt: String
    createdBy: String
    credit: Float!
    currency: String
    group: String
    leverage: Int!
    login: Int!
    name: String
    platformType: String!
    profile: AccountView__Profile!
    isReadOnly: Boolean
  }
`;
