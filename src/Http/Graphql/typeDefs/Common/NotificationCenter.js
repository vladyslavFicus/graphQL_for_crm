const { gql } = require('apollo-server-express');

module.exports = gql`
  type NotificationCenter {
    uuid: String!
    read: Boolean!
    priority: String!
    type: String!
    subtype: String!
    createdAt: String!
    details: Object
    client: ProfileView
    agent: Operator
  }
`;
