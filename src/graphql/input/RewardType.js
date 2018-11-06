const { GraphQLInputObjectType, GraphQLString, GraphQLNonNull } = require('graphql');

const RewardType = new GraphQLInputObjectType({
  name: 'InputReward',
  fields: () => ({
    uuid: { type: new GraphQLNonNull(GraphQLString) },
    type: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

module.exports = RewardType;
