const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
} = require('graphql');
const {
  callbacks: { updateCallback },
} = require('../../common/resolvers');
const { ResponseType } = require('../../common/types');
const { CallbackType } = require('../../query/CallbackType');
const { CallbackStatusEnum } = require('../../query/CallbackType');

const CallbacksMutation = new GraphQLObjectType({
  name: 'CallbacksMutation',
  fields: () => ({
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
