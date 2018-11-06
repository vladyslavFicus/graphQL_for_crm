const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require('graphql');

const CmsGameProviderType = new GraphQLObjectType({
  name: 'CmsGameProvider',
  fields: () => ({
    id: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    name: { type: new GraphQLNonNull(GraphQLString) },
    updatedAt: { type: GraphQLString },
  }),
});

module.exports = CmsGameProviderType;
