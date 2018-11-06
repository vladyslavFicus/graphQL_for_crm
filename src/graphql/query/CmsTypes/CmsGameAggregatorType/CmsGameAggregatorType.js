const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require('graphql');

const CmsGameAggregatorType = new GraphQLObjectType({
  name: 'CmsGameAggregator',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

module.exports = CmsGameAggregatorType;
