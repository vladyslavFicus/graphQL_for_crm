const { gql } = require('apollo-server-express');

module.exports = gql`
  input FileToUpload {
    comment: String
    documentType: String!
    expirationDate: String
    fileUuid: String!
    title: String!
    verificationType: String!
  }
`;
