const { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString } = require('graphql');

const TagType = new GraphQLObjectType({
  name: 'Tag',
  fields: () => ({
    tagId: { type: new GraphQLNonNull(GraphQLID) },
    tagName: { type: GraphQLString },
  }),
});

module.exports = TagType;
