const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLBoolean } = require('graphql');
const { getOperator } = require('../../common/resolvers/operators');
const OperatorType = require('../OperatorType');

const NoteType = new GraphQLObjectType({
  name: 'Note',
  fields: () => ({
    playerUUID: { type: GraphQLString },
    pinned: { type: GraphQLBoolean },
    subject: { type: GraphQLString },
    content: { type: GraphQLString },
    targetUUID: { type: GraphQLString },
    targetType: { type: GraphQLString },
    changedBy: { type: GraphQLString },
    changedAt: { type: GraphQLString },
    noteId: { type: GraphQLString },
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
