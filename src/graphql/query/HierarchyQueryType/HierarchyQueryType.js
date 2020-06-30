const { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLString, GraphQLBoolean } = require('graphql');
const {
  HierarchyUsersType,
  HierarchyBranchType,
} = require('./HierarchyType');
const ResponseType = require('../../common/types/ResponseType');
const {
  getUsersByType,
  getBranchInfo,
  getBranchChildren,
} = require('../../../graphql/common/resolvers/hierarchy');

const HierarchyQueryType = new GraphQLObjectType({
  name: 'HierarchyQueryType',
  fields: () => ({
    // # 5
    hierarchyUsersByType: {
      args: {
        userTypes: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
        onlyActive: { type: GraphQLBoolean },
      },
      type: ResponseType(HierarchyUsersType),
      resolve: getUsersByType,
    },
    // # 6
    branchInfo: {
      args: {
        branchId: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(HierarchyBranchType),
      resolve: getBranchInfo,
    },
    // # 4
    branchChildren: {
      args: {
        uuid: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(new GraphQLList(HierarchyBranchType), 'HierarchyBranchChildrenType'),
      resolve: getBranchChildren,
    },
  }),
});

module.exports = HierarchyQueryType;
