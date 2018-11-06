const { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLInputObjectType, GraphQLString } = require('graphql');
const { GraphQLUpload } = require('apollo-upload-server');
const ResponseType = require('../../common/types/ResponseType');
const FileQueryType = require('../../query/FileType');
const {
  files: { refuse, verify, deleteFile, uploadFile, confirmFiles },
} = require('../../common/resolvers');

const InputFile = new GraphQLInputObjectType({
  name: 'InputFile',
  fields: () => ({
    uuid: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    category: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const FileType = new GraphQLObjectType({
  name: 'FileType',
  fields: () => ({
    refuse: {
      args: {
        uuid: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(FileQueryType, 'RefuseFileType'),
      resolve: verify,
    },
    verify: {
      args: {
        uuid: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(FileQueryType, 'VerifyFileType'),
      resolve: refuse,
    },
    delete: {
      args: {
        uuid: { type: new GraphQLNonNull(GraphQLString) },
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(FileQueryType, 'DeleteFileType'),
      resolve: deleteFile,
    },
    upload: {
      args: {
        file: { type: GraphQLUpload },
      },
      type: ResponseType(FileQueryType, 'UploadFileType'),
      resolve: uploadFile,
    },
    confirmFiles: {
      args: {
        files: { type: new GraphQLList(InputFile) },
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(new GraphQLList(FileQueryType), 'ConfirmFileType'),
      resolve: confirmFiles,
    },
  }),
});

module.exports = FileType;
