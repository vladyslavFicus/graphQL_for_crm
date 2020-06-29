const { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLString, GraphQLBoolean } = require('graphql');
const {
  HierarchyUsersType,
  HierarchyUsersType: { UserType },
  HierarchyBranchType,
  HierarchyBranchType: { HierarchyBranchTreeType },
} = require('./HierarchyType');
const ResponseType = require('../../common/types/ResponseType');
const {
  getUsersByType,
  getBranchInfo,
  getBranchHierarchy,
  getBranchHierarchyTree,
  getUserHierarchy,
  getUserHierarchyById,
  getUsersByBranch,
  getBranchChildren,
} = require('../../../graphql/common/resolvers/hierarchy');
const { DeskTypeEnum } = require('./HierarchyType/HierarchyEnums');

const HierarchyQueryType = new GraphQLObjectType({
  name: 'HierarchyQueryType',
  fields: () => ({
    hierarchyUsersByType: {
      args: {
        userTypes: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
        onlyActive: { type: GraphQLBoolean },
      },
      type: ResponseType(HierarchyUsersType),
      resolve: getUsersByType,
    },
    branchInfo: {
      args: {
        branchId: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(HierarchyBranchType),
      resolve: getBranchInfo,
    },
    userHierarchy: {
      type: ResponseType(UserType, 'UserHierarchy'),
      resolve: getUserHierarchy,
    },
    userHierarchyById: {
      args: {
        userId: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(UserType, 'UserHierarchyById'),
      resolve: getUserHierarchyById,
    },
    branchHierarchy: {
      args: {
        branchType: { type: new GraphQLNonNull(GraphQLString) },
        keyword: { type: GraphQLString },
        officeUuid: { type: GraphQLString },
        deskUuid: { type: GraphQLString },
        deskType: { type: DeskTypeEnum },
        country: { type: GraphQLString },
      },
      type: ResponseType(new GraphQLList(HierarchyBranchType), 'HierarchyMultiBranches'),
      resolve: getBranchHierarchy,
    },
    branchHierarchyTree: {
      args: {
        branchUUID: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(HierarchyBranchTreeType, 'BranchHierarchyTree'),
      resolve: getBranchHierarchyTree,
    },
    usersByBranch: {
      args: {
        uuids: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
        onlyActive: { type: GraphQLBoolean },
      },
      type: ResponseType(new GraphQLList(UserType), 'UsersByBranchType'),
      resolve: getUsersByBranch,
    },
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
