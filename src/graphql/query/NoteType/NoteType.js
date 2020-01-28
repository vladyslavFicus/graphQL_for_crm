const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLBoolean } = require('graphql');
const { getOperator } = require('../../common/resolvers/operators');
const OperatorType = require('../OperatorType');

const NoteType = new GraphQLObjectType({
  name: 'Note',
  fields: () => ({
    playerUUID: { type: new GraphQLNonNull(GraphQLString) },
    pinned: { type: new GraphQLNonNull(GraphQLBoolean) },
    subject: { type: GraphQLString },
    content: { type: new GraphQLNonNull(GraphQLString) },
    targetUUID: { type: new GraphQLNonNull(GraphQLString) },
    changedBy: { type: new GraphQLNonNull(GraphQLString) },
    changedAt: { type: GraphQLString },
    noteId: { type: new GraphQLNonNull(GraphQLString) },
    _id: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ noteId }) => noteId,
    },
    operator: {
      type: OperatorType,
      resolve: getOperator('changedBy'),
    },
  }),
});

module.exports = NoteType;
