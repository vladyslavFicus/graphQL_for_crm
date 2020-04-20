const { GraphQLObjectType, GraphQLBoolean, GraphQLNonNull, GraphQLString, GraphQLInt } = require('graphql');
const SuccessType = require('../../query/SuccessType');

const {
  asterisk: { createCall },
} = require('../../common/resolvers');

const AsteriskMutation = new GraphQLObjectType({
  name: 'AsteriskMutation',
  fields: () => ({
    createCall: {
      args: {
        number: { type: new GraphQLNonNull(GraphQLString) },
        prefix: { type: new GraphQLNonNull(GraphQLInt) },
      },
      type: SuccessType,
      resolve: createCall,
    },
  }),
});

module.exports = AsteriskMutation;
