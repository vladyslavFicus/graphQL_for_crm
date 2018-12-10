const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require('graphql');
const {
  callbacks: { createCallback, updateCallback },
} = require('../../common/resolvers');
const { ResponseType } = require('../../common/types');
const { CallbackType } = require('../../query/CallbackType');
const { CallbackStatusEnum } = require('../../query/CallbackType');

const CallbacksMutation = new GraphQLObjectType({
  name: 'CallbacksMutation',
  fields: () => ({
    create: {
      args: {
        userId: { type: new GraphQLNonNull(GraphQLString) },
        operatorId: { type: new GraphQLNonNull(GraphQLString) },
        callbackTime: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(CallbackType, 'CreateCallback'),
      resolve: createCallback,
    },
    update: {
      args: {
        callbackId: { type: new GraphQLNonNull(GraphQLString) },
        callbackTime: { type: GraphQLString },
        operatorId: { type: GraphQLString },
        status: { type: CallbackStatusEnum },
      },
      type: ResponseType(CallbackType),
      resolve: updateCallback,
    },
  }),
});

module.exports = CallbacksMutation;
