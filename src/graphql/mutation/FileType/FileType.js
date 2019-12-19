const { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLInputObjectType, GraphQLString } = require('graphql');
const { GraphQLUpload } = require('apollo-server-express');
const ResponseType = require('../../common/types/ResponseType');
const { FileType: FileQueryType } = require('../../query/FileType/FileType');
const SuccessType = require('../../query/SuccessType');
const {
  files: { verify, deleteFile, uploadFile, confirmFilesUpload, updateFileStatus, updateFileMeta },
} = require('../../common/resolvers');

const InputFileType = new GraphQLInputObjectType({
  name: 'InputFileType',
  fields: () => ({
    fileUuid: { type: new GraphQLNonNull(GraphQLString) },
    documentType: { type: new GraphQLNonNull(GraphQLString) },
    verificationType: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    comment: { type: GraphQLString },
    expirationDate: { type: GraphQLString },
  }),
});

const FileType = new GraphQLObjectType({
  name: 'FileType',
  fields: () => ({
    verify: {
      args: {
        uuid: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(FileQueryType, 'VerifyFileType'),
      resolve: verify,
    },
    delete: {
      args: {
        uuid: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(FileQueryType, 'DeleteFileType'),
      resolve: deleteFile,
    },
    upload: {
      args: {
        file: { type: new GraphQLNonNull(GraphQLUpload) },
        profileUUID: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(
        new GraphQLObjectType({
          name: 'UploadFileUuidType',
          fields: () => ({
            fileUUID: { type: GraphQLString },
          }),
        }),
        'UploadFileType'
      ),
      resolve: uploadFile,
    },
    confirmFiles: {
      args: {
        documents: { type: new GraphQLList(InputFileType) },
        profileUuid: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(SuccessType, 'ConfirmFileType'),
      resolve: confirmFilesUpload,
    },
    updateFileStatus: {
      args: {
        clientUuid: { type: new GraphQLNonNull(GraphQLString) },
        verificationType: { type: GraphQLString },
        documentType: { type: GraphQLString },
        verificationStatus: { type: GraphQLString },
      },
      type: SuccessType,
      resolve: updateFileStatus,
    },
    updateFileMeta: {
      args: {
        uuid: { type: new GraphQLNonNull(GraphQLString) },
        verificationType: { type: GraphQLString },
        documentType: { type: GraphQLString },
      },
      type: SuccessType,
      resolve: updateFileMeta,
    },
  }),
});

module.exports = FileType;
