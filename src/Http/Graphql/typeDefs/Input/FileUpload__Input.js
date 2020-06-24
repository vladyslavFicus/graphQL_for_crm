const { gql } = require('apollo-server-express');

module.exports = gql`
  input FileUpload__Input {
    comment: String
    documentType: String!
    expirationDate: String
    fileUuid: String!
    title: String!
    verificationType: String!
  }
`;
