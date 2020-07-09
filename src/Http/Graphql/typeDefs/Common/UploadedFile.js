const { gql } = require('apollo-server-express');

module.exports = gql`
  type UploadedFile {
    fileUuid: String!
  }
`;
