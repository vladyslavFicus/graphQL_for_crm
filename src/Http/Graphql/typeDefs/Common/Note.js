const { gql } = require('apollo-server-express');

module.exports = gql`
  type Note {
    _id: ID!
    uuid: String!
    changedBy: String
    changedAt: String
    content: String
    noteId: String
    operator: Operator
    pinned: Boolean
    playerUUID: String
    subject: String
    targetUUID: String
    targetType: String
  }
`;
