const { gql } = require('apollo-server-express');

module.exports = gql`
  type NoteMutation {
    add(
      content: String!
      playerUUID: String!
      pinned: Boolean
      subject: String
      targetType: String!
      targetUUID: String!
    ): Note

    update(
      content: String!
      noteId: String!
      pinned: Boolean
      subject: String
      targetUUID: String
    ): Note

    remove(
      noteId: String!
    ): Note
  }
`;