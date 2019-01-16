const { GraphQLObjectType, GraphQLList } = require('graphql');
const HierarchyBranchType = require('./HierarchyBranchType');

const UserBranchHierarchyType = new GraphQLObjectType({
  name: 'UserBranchHierarchyType',
  fields: () => ({
    OFFICE: { type: new GraphQLList(HierarchyBranchType) },
    DESK: { type: new GraphQLList(HierarchyBranchType) },
    TEAM: { type: new GraphQLList(HierarchyBranchType) },
    COMPANY: { type: new GraphQLList(HierarchyBranchType) },
    BRAND: { type: new GraphQLList(HierarchyBranchType) },
  }),
});

module.exports = UserBranchHierarchyType;
