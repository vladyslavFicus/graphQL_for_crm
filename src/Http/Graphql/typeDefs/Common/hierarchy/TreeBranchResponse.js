const { gql } = require('apollo-server-express');

module.exports = gql`
  type HierarchyTreeBranchResponse {
    children: [HierarchyTreeBranch]
    users: [HierarchyTreeUser]
  }
`;
