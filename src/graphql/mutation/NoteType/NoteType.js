const { GraphQLBoolean, GraphQLObjectType, GraphQLNonNull, GraphQLString } = require('graphql');

const ResponseType = require('../../common/types/ResponseType');
const { NoteType } = require('../../query/NoteType');
const {
  notes: { updateNote, addNote, removeNote },
} = require('../../common/resolvers');

const NoteMutation = new GraphQLObjectType({
  name: 'NoteMutation',
  fields: () => ({
    update: {
      args: {
        noteId: { type: new GraphQLNonNull(GraphQLString) },
        targetUUID: { type: GraphQLString },
        subject: { type: GraphQLString },
        content: { type: new GraphQLNonNull(GraphQLString) },
        pinned: { type: GraphQLBoolean },
      },
      type: ResponseType(NoteType, 'updateNote'),
      resolve: updateNote,
    },
    add: {
      args: {
        subject: { type: GraphQLString },
        content: { type: new GraphQLNonNull(GraphQLString) },
        targetUUID: { type: new GraphQLNonNull(GraphQLString) },
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
        pinned: { type: GraphQLBoolean },
        targetType: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(NoteType, 'addNote'),
      resolve: addNote,
    },
    remove: {
      args: {
        noteId: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(NoteType, 'removeNote'),
      resolve: removeNote,
    },
  }),
});

module.exports = NoteMutation;
