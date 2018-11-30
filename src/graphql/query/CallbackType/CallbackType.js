const { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString } = require('graphql');
const { getOperator, getClient } = require('../../common/resolvers/callbacks');
const OperatorType = require('../OperatorType');
const PlayerProfileType = require('../PlayerProfileType');
const CallbackStatusEnum = require('./CallbackStatusEnum');

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
    operator: {
      type: OperatorType,
      resolve: getOperator,
    },
    client: {
      type: PlayerProfileType,
      resolve: getClient,
    },
  }),
});

module.exports = CallbackType;
