const { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString } = require('graphql');
const { getOperator } = require('../../common/resolvers/operators');
const { getNote } = require('../../common/resolvers/notes');
const { NoteType } = require('../NoteType');
const OperatorType = require('../OperatorType');
const ProfileViewType = require('../ProfileViewType');
const CallbackStatusEnum = require('./CallbackStatusEnum');
const {
  profile: { getProfileView },
} = require('../../common/resolvers');

const CallbackType = new GraphQLObjectType({
  name: 'Callback',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID), resolve: ({ callbackId }) => callbackId },
    callbackId: { type: new GraphQLNonNull(GraphQLString) },
    callbackTime: { type: new GraphQLNonNull(GraphQLString) },
    creationTime: { type: new GraphQLNonNull(GraphQLString) },
    updateTime: { type: new GraphQLNonNull(GraphQLString) },
    operatorId: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: new GraphQLNonNull(CallbackStatusEnum) },
    userId: { type: new GraphQLNonNull(GraphQLString) },
    reminder: { type: GraphQLString },
    operator: {
      type: OperatorType,
      resolve: getOperator('operatorId'),
    },
    client: {
      type: ProfileViewType,
      resolve: ({ userId }, _, { headers: { authorization } }) => {
        return getProfileView(userId, authorization);
      },
    },
    note: {
      type: NoteType,
      resolve: getNote('callbackId'),
    },
  }),
});

module.exports = CallbackType;
