const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLBoolean } = require('graphql');
const {
  hierarchy: {
    addOperatorToBranch,
    removeOperatorFromBranch,
    updateHierarchyUser,
  },
} = require('../../common/resolvers');
const ResponseType = require('../../common/types/ResponseType');

const HierarchyMutation = new GraphQLObjectType({
  name: 'HierarchyMutation',
  fields: () => ({
    addOperatorToBranch: {
      args: {
        branchId: { type: new GraphQLNonNull(GraphQLString) },
        operatorId: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(GraphQLBoolean, 'SuccessAddedOperatorToBranch'),
      resolve: addOperatorToBranch,
    },
    removeOperatorFromBranch: {
      args: {
        branchId: { type: new GraphQLNonNull(GraphQLString) },
        operatorId: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(GraphQLBoolean, 'SuccessRemovedOperatorFromBranch'),
      resolve: removeOperatorFromBranch,
    },
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
