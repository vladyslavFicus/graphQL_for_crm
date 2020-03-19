const { GraphQLInputObjectType, GraphQLString } = require('graphql');

const SortInputType = new GraphQLInputObjectType({
  name: 'SortInputType',
  fields: () => ({
    column: { type: GraphQLString },
    direction: { type: GraphQLString },
  }),
});

module.exports = SortInputType;
