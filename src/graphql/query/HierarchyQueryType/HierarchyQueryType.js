const { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLString } = require('graphql');
const {
  UserBranchHierarchyType,
  HierarchyUsersType,
  HierarchyUsersType: { UserType },
  HierarchyBranchType,
  HierarchyBranchType: { HierarchyMultiBranchesType },
} = require('./HierarchyType');
const ResponseType = require('../../common/types/ResponseType');
const {
  getUserBranchHierarchy,
  getUsersByType,
  getBranchInfo,
  getBranchHierarchy,
  getUsersByBranch,
} = require('../../../graphql/common/resolvers/hierarchy');
const { DeskTypeEnum, DeskDefaultFlagEnum } = require('./HierarchyType/HierarchyEnums');

const HierarchyQueryType = new GraphQLObjectType({
  name: 'HierarchyQueryType',
  fields: () => ({
    userBranchHierarchy: {
      type: ResponseType(UserBranchHierarchyType),
      args: {
        userId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: getUserBranchHierarchy,
    },
    hierarchyUsersByType: {
      args: {
        userTypes: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
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
    branchHierarchy: {
      args: {
        operatorId: { type: new GraphQLNonNull(GraphQLString) },
        branchType: { type: new GraphQLNonNull(GraphQLString) },
        keyword: { type: GraphQLString },
        officeUuid: { type: GraphQLString },
        deskUuid: { type: GraphQLString },
        deskType: { type: DeskTypeEnum },
        defaultDeskFlag: { type: DeskDefaultFlagEnum },
        country: { type: GraphQLString },
      },
      type: ResponseType(new GraphQLList(HierarchyMultiBranchesType), 'HierarchyMultiBranches'),
      resolve: getBranchHierarchy,
    },
    usersByBranch: {
      args: {
        uuid: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(new GraphQLList(UserType), 'UsersByBranchType'),
      resolve: getUsersByBranch,
    },
  }),
});

module.exports = HierarchyQueryType;
