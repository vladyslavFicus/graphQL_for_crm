const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
} = require('graphql');
const ProfileViewType = require('../ProfileViewType');
const {
  profile: { getProfileView },
  notes: { getNote },
} = require('../../common/resolvers');
const { NoteType } = require('../NoteType');

const FileType = new GraphQLObjectType({
  name: 'File',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve({ uuid }) {
        return uuid;
      },
    },
    // new scheme
    brandId: { type: GraphQLString },
    title: { type: GraphQLString },
    mediaType: { type: GraphQLString },
    contentLength: { type: GraphQLInt },
    uploadBy: { type: new GraphQLNonNull(GraphQLString) },
    clientUuid: { type: new GraphQLNonNull(GraphQLString) },
    documentType: { type: GraphQLString },
    modificationDate: { type: GraphQLString },
    modifiedBy: { type: GraphQLString },
    rejectedReason: { type: GraphQLString },
    comment: { type: GraphQLString },
    expirationDate: { type: GraphQLString },
    hidden: { type: GraphQLBoolean },
    hiddenBy: { type: GraphQLString },
    verificationType: { type: GraphQLString },
    client: {
      type: ProfileViewType,
      resolve: ({ clientUuid }, _, { headers: { authorization } }) => {
        return getProfileView(clientUuid, authorization);
      },
    },
    category: { type: GraphQLString },
    name: { type: GraphQLString },
    fileName: { type: GraphQLString },
    playerUUID: {
      type: new GraphQLNonNull(GraphQLString),
      resolve({ playerUuid }) {
        return playerUuid;
      },
    },
    uuid: { type: new GraphQLNonNull(GraphQLString) },
    type: { type: GraphQLString },
    uploadDate: { type: new GraphQLNonNull(GraphQLString) },
    targetUUID: {
      type: GraphQLString,
      resolve({ targetUuid }) {
        return targetUuid;
      },
    },
    status: { type: GraphQLString },
    note: {
      type: NoteType,
      resolve: getNote('uuid'),
    },
  }),
});

// FileByUuidType
const DocumentType = new GraphQLObjectType({
  name: 'DocumentType',
  fields: () => ({
    documentType: { type: GraphQLString },
    verificationTime: { type: GraphQLString },
    verifiedBy: { type: GraphQLString },
    verificationStatus: { type: GraphQLString },
    files: { type: new GraphQLList(FileType) },
  }),
});

const FileByUuidType = new GraphQLObjectType({
  name: 'FileByUuid',
  fields: () => ({
    verificationType: { type: GraphQLString },
    attemptsLeft: { type: GraphQLInt },
    documents: { type: new GraphQLList(DocumentType) },
  }),
});

module.exports = {
  FileType,
  FileByUuidType,
};
