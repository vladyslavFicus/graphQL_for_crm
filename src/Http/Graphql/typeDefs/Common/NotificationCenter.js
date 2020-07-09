const { gql } = require('apollo-server-express');

module.exports = gql`
  type NotificationCenter__Details {
    amount: String
    currency: String
    login: Int
    platformType: String
    callbackTime: String
  }

  type NotificationCenter {
    agent: Operator
    client: ProfileView
    createdAt: String
    details: NotificationCenter__Details
    priority: String
    read: Boolean
    subtype: String
    type: String
    uuid: String
  }
`;
