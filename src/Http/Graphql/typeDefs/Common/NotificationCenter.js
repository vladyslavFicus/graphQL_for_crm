const { gql } = require('apollo-server-express');

module.exports = gql`
  type NotificationCenter {
    agent: Operator
    client: ProfileView
    createdAt: String
    details: Object
    priority: String
    read: Boolean
    subtype: String
    type: String
    uuid: String
  }
`;
