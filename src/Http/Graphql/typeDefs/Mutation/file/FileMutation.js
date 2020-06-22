const { gql } = require('apollo-server-express');

module.exports = gql`
  type FileMutation {
    updateFileMeta(uuid: String!, verificationType: String, documentType: String, status: String): Boolean
    updateFileStatus(uuid: String!, documentType: String, verificationType: String, verificationStatus: String): Boolean
    confirmFilesUploading(documents: [FileToUpload], profileUuid: String!): Boolean
    upload(file: Upload!, uuid: String): UploadedFile @response
    delete(uuid: String!): Boolean
  }
`;
