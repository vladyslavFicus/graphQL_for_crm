const { GraphQLString, GraphQLObjectType, GraphQLNonNull, GraphQLInt } = require('graphql');

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
        type: new GraphQLNonNull(GraphQLInt),
      },
      role: {
        type: new GraphQLNonNull(GraphQLString),
      },
    };
  },
});

module.exports = AuthorityType;
