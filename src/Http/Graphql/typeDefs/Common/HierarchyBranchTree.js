const { gql } = require('apollo-server-express');

module.exports = gql`
  type HierarchyBranchTree {
    branchType: String!
    children: [HierarchyBranchTree]
    country: String
    deskType: Desk__Types__Enum
    language: String
    name: String!
    parentBranches: [HierarchyBranch]
    parentUsers: [HierarchyUser]
    users: [HierarchyUser]
    uuid: String!
  }
`;
