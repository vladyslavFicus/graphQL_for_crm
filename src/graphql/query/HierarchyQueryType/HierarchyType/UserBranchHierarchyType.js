const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLBoolean } = require('graphql');
const { BranchTypeEnum, DeskTypeEnum } = require('./HierarchyEnums');

const BranchHierarchyType = new GraphQLObjectType({
  name: 'BranchHierarchyType',
  fields: () => ({
    name: { type: GraphQLString },
    uuid: { type: new GraphQLNonNull(GraphQLString) },
    brandId: { type: GraphQLString },
    branchType: { type: new GraphQLNonNull(BranchTypeEnum) },
    deskType: { type: DeskTypeEnum },
    country: { type: GraphQLString },
    language: { type: GraphQLString },
    parentBranches: { type: new GraphQLList(GraphQLString) },
    defaultBranch: { type: GraphQLString },
    defaultUser: { type: GraphQLString },
    isDefault: { type: GraphQLBoolean },
  }),
});

const UserBranchHierarchyType = new GraphQLObjectType({
  name: 'UserBranchHierarchyType',
  fields: () => ({
    OFFICE: { type: new GraphQLList(BranchHierarchyType) },
    DESK: { type: new GraphQLList(BranchHierarchyType) },
    TEAM: { type: new GraphQLList(BranchHierarchyType) },
    COMPANY: { type: new GraphQLList(BranchHierarchyType) },
    BRAND: { type: new GraphQLList(BranchHierarchyType) },
  }),
});

module.exports = UserBranchHierarchyType;
