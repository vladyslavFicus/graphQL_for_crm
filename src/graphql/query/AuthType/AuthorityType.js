const { GraphQLString, GraphQLObjectType, GraphQLNonNull } = require('graphql');

const AuthorityType = new GraphQLObjectType({
  name: 'Authority',
  fields() {
    return {
      brandId: {
        type: new GraphQLNonNull(GraphQLString),
      },
      department: {
        type: new GraphQLNonNull(GraphQLString),
      },
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
      role: {
        type: new GraphQLNonNull(GraphQLString),
      },
    };
  },
});

module.exports = AuthorityType;
