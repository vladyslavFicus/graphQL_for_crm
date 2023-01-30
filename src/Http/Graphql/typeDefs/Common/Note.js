const { gql } = require('apollo-server-express');

module.exports = gql`
  type Note {
    _id: ID!
    noteId: String!
    playerUUID: String!
    targetUUID: String!
    targetType: String!
    content: String!
    pinned: Boolean!
    changedAt: String!
    changedBy: String!
    uuid: String
    subject: String
    operator: Operator
  }
`;
