const { gql } = require('apollo-server-express');

module.exports = gql`
  type FileMutation {
    updateFileMeta(
      uuid: String!
      title: String
      verificationType: String
      documentType: String
      status: String
    ): Boolean

    updateFileStatus(
      uuid: String!
      documentType: String
      verificationType: String
      verificationStatus: String
    ): Boolean

    confirmFilesUploading(
      documents: [FileUpload__Input]
      profileUuid: String!
    ): Boolean

    upload(
      file: Upload!
      uuid: String
    ): UploadedFile

    delete(
      uuid: String!
    ): Boolean
  }
`;
