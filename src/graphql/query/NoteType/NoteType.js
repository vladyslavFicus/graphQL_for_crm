const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLBoolean } = require('graphql');

const NoteType = new GraphQLObjectType({
  name: 'Note',
  fields: () => ({
    playerUUID: { type: new GraphQLNonNull(GraphQLString) },
    pinned: { type: new GraphQLNonNull(GraphQLBoolean) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    targetUUID: { type: new GraphQLNonNull(GraphQLString) },
    changedBy: { type: new GraphQLNonNull(GraphQLString) },
    changedAt: { type: GraphQLString },
    noteId: { type: new GraphQLNonNull(GraphQLString) },
    _id: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ noteId }) => noteId,
    },
  }),
});

module.exports = NoteType;
