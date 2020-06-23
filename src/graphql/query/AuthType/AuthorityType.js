const { GraphQLString, GraphQLObjectType, GraphQLNonNull, GraphQLInt } = require('graphql');

// # Can be removed after Operator and Partner types will be deleted
const AuthorityType = new GraphQLObjectType({
  name: 'Authority',
  fields() {
    return {
      brand: {
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
