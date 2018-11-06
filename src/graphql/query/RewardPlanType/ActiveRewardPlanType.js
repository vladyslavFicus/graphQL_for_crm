const { GraphQLObjectType, GraphQLFloat, GraphQLString, GraphQLID, GraphQLNonNull } = require('graphql');

const ActiveRewardPlanType = new GraphQLObjectType({
  name: 'ActiveRewardPlan',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID), resolve: ({ type }) => type },
    amount: { type: new GraphQLNonNull(GraphQLFloat) },
    type: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

module.exports = ActiveRewardPlanType;
