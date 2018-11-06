const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require('graphql');

const ResponseType = require('../../common/types/ResponseType');
const FreeSpinType = require('../../query/FreeSpinType');
const {
  freeSpin: { declineFreeSpin },
} = require('../../common/resolvers');

const FreeSpinMutationType = new GraphQLObjectType({
  name: 'FreeSpinMutation',
  fields: () => ({
    decline: {
      args: {
        uuid: { type: new GraphQLNonNull(GraphQLString) },
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(FreeSpinType, 'DeclineFreeSpin'),
      resolve: declineFreeSpin,
    },
  }),
});

module.exports = FreeSpinMutationType;
