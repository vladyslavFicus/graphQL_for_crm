const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLBoolean } = require('graphql');
const { DeskTypeEnum } = require('./HierarchyEnums');

const HierarchyBranchType = new GraphQLObjectType({
  name: 'HierarchyBranchType',
  fields: () => ({
    uuid: { type: new GraphQLNonNull(GraphQLString) },
    branchType: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    country: { type: GraphQLString },
    defaultUser: { type: GraphQLString },
    parentBranches: { type: new GraphQLList(GraphQLString) },
    deskType: { type: DeskTypeEnum },
    language: { type: GraphQLString },
    defaultBranch: { type: GraphQLString },
    isDefault: { type: GraphQLBoolean },
  }),
});

const HierarchyMultiBranchesType = new GraphQLObjectType({
  name: 'HierarchyMultiBranchesType',
  fields: () => ({
    office: { type: HierarchyBranchType },
    desk: { type: HierarchyBranchType },
    team: { type: HierarchyBranchType },
  }),
});

const HierarchyBranchTreeType = new GraphQLObjectType({
  name: 'HierarchyBranchTreeType',
  fields: () => ({
    uuid: { type: new GraphQLNonNull(GraphQLString) },
    branchType: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    country: { type: GraphQLString },
    parentBranches: { type: new GraphQLList(HierarchyBranchType) },
    parentUsers: { type: new GraphQLList(require('./HierarchyUsersType').UserType) },
    deskType: { type: DeskTypeEnum },
    language: { type: GraphQLString },
    children: { type: new GraphQLList(HierarchyBranchTreeType) },
    users: { type: new GraphQLList(require('./HierarchyUsersType').UserType) },
  }),
});

module.exports = HierarchyBranchType;
module.exports.HierarchyMultiBranchesType = HierarchyMultiBranchesType;
module.exports.HierarchyBranchTreeType = HierarchyBranchTreeType;
