const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLFloat, GraphQLID } = require('graphql');

const PendingPlanType = new GraphQLObjectType({
  name: 'PendingPlan',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID), resolve: ({ type }) => type },
    amount: { type: new GraphQLNonNull(GraphQLFloat) },
    type: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

module.exports = PendingPlanType;
