const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLBoolean } = require('graphql');
const {
  hierarchy: {
    updateHierarchyUser,
  },
} = require('../../common/resolvers');
const ResponseType = require('../../common/types/ResponseType');

const HierarchyMutation = new GraphQLObjectType({
  name: 'HierarchyMutation',
  fields: () => ({
    updateUser: {
      args: {
        operatorId: { type: new GraphQLNonNull(GraphQLString) },
        userType: { type: GraphQLString },
      },
      type: ResponseType(null, 'updateHierarchyOperatorType'),
      resolve: updateHierarchyUser,
    },
  }),
});

module.exports = HierarchyMutation;
