const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID } = require('graphql');
const { getNotes } = require('../../common/resolvers/notes');
const { NoteType } = require('../NoteType');

const FileStatusType = new GraphQLObjectType({
  name: 'FileStatus',
  fields: () => ({
    author: { type: new GraphQLNonNull(GraphQLString) },
    comment: { type: GraphQLString },
    value: { type: new GraphQLNonNull(GraphQLString) },
    editDate: { type: GraphQLString },
  }),
});

const FileType = new GraphQLObjectType({
  name: 'File',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve({ uuid }) {
        return uuid;
      },
    },
    author: { type: new GraphQLNonNull(GraphQLString) },
    category: { type: GraphQLString },
    name: { type: new GraphQLNonNull(GraphQLString) },
    playerUUID: {
      type: new GraphQLNonNull(GraphQLString),
      resolve({ playerUuid }) {
        return playerUuid;
      },
    },
    realName: { type: GraphQLString },
    uuid: { type: new GraphQLNonNull(GraphQLString) },
    type: { type: new GraphQLNonNull(GraphQLString) },
    uploadDate: { type: new GraphQLNonNull(GraphQLString) },
    targetUUID: {
      type: GraphQLString,
      resolve({ targetUuid }) {
        return targetUuid;
      },
    },
    status: { type: FileStatusType },
    note: {
      type: NoteType,
      resolve: async ({ uuid }, _, context) => {
        const {
          data: { content },
        } = await getNotes(null, { targetUUID: uuid }, context);

        return content[0];
      },
    },
  }),
});

module.exports = FileType;
