const { gql } = require('apollo-server-express');

module.exports = gql`
  type File {
    _id: ID!
    brandId: String
    title: String
    mediaType: String
    contentLength: Int
    uploadBy: String!
    clientUuid: String!
    documentType: String
    modificationDate: String
    modifiedBy: String
    rejectedReason: String
    comment: String
    expirationDate: String
    hidden: Boolean
    hiddenBy: String
    verificationType: String
    client: ProfileView
    category: String
    name: String
    fileName: String
    playerUUID: String!
    uuid: String!
    type: String
    uploadDate: String!
    targetUUID: String!
    status: String
    note: Note
  }
`;
