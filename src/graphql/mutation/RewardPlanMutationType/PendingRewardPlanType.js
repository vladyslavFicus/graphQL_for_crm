const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLFloat, GraphQLBoolean } = require('graphql');

const ResponseType = require('../../common/types/ResponseType');
const {
  rewardPlan: { updateRewardPlan },
} = require('../../common/resolvers');
const PendingPlanType = require('../../common/types/PendingPlanType');

const PendingRewardPlanType = new GraphQLObjectType({
  name: 'PendingRewardPlanMutation',
  fields: () => ({
    update: {
      args: {
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
        type: { type: new GraphQLNonNull(GraphQLString) },
        amount: { type: new GraphQLNonNull(GraphQLFloat) },
      },
      type: ResponseType(PendingPlanType, 'updatePendingRewardPlan'),
      resolve: updateRewardPlan,
    },
  }),
});

module.exports = PendingRewardPlanType;
