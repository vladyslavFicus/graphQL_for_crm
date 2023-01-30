const { gql } = require('apollo-server-express');

module.exports = gql`
  type NoteMutation {
    add(
      content: String!
      playerUUID: String!
      pinned: Boolean!
      subject: String
      targetType: String!
      targetUUID: String!
    ): Boolean

    update(
      noteId: String!
      content: String!
      subject: String
      pinned: Boolean!
    ): Boolean

    remove(
      noteId: String!
    ): Boolean
  }
`;
