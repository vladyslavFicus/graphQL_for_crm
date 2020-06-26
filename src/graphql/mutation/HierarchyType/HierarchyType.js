const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLBoolean } = require('graphql');
const {
  hierarchy: {
    addOperatorToBranch,
    removeOperatorFromBranch,
    updateHierarchyUser,
    addBranchManager,
    removeBranchManager,
  },
} = require('../../common/resolvers');
const SuccessType = require('../../query/SuccessType');
const ResponseType = require('../../common/types/ResponseType');

const HierarchyMutation = new GraphQLObjectType({
  name: 'HierarchyMutation',
  fields: () => ({
    addBranchManager: {
      args: {
        branchUuid: { type: new GraphQLNonNull(GraphQLString) },
        operatorUuid: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: SuccessType,
      resolve: addBranchManager,
    },
    removeBranchManager: {
      args: {
        branchUuid: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: SuccessType,
      resolve: removeBranchManager,
    },
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
