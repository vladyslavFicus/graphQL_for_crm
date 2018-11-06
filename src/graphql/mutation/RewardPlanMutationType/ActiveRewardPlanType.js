const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLFloat, GraphQLBoolean } = require('graphql');

const ResponseType = require('../../common/types/ResponseType');
const {
  rewardPlan: { updateRewardPlan },
} = require('../../common/resolvers');
const { ActiveRewardPlan } = require('../../query/RewardPlanType');

const ActiveRewardPlanType = new GraphQLObjectType({
  name: 'ActiveRewardPlanMutation',
  fields: () => ({
    update: {
      args: {
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
        type: { type: new GraphQLNonNull(GraphQLString) },
        amount: { type: new GraphQLNonNull(GraphQLFloat) },
      },
      type: ResponseType(ActiveRewardPlan, 'updateActiveRewardPlan'),
      resolve: updateRewardPlan,
    },
  }),
});

module.exports = ActiveRewardPlanType;
