const { GraphQLObjectType, GraphQLID, GraphQLNonNull, GraphQLList } = require('graphql');

const PendingPlanType = require('../../common/types/PendingPlanType');

const PendingRewardPlanType = new GraphQLObjectType({
  name: 'PendingRewardPlan',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID), resolve: ({ type }) => type },
    plans: { type: new GraphQLList(PendingPlanType) },
  }),
});

module.exports = PendingRewardPlanType;
