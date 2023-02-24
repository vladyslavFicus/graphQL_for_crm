const { gql } = require('apollo-server-express');

module.exports = gql`  
  type DocumentFile {
    uuid: String!,
    title: String!,
    fileName: String!,
    mediaType: String!,
    uploadDate: String!,
    uploadBy: String!,
    documentType: String!,
    description: String,
  }
`;
