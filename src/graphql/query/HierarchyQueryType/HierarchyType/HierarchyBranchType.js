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

module.exports = HierarchyBranchType;
module.exports.HierarchyMultiBranchesType = HierarchyMultiBranchesType;
