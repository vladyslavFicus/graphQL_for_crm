const { gql } = require('apollo-server-express');

module.exports = gql`
  type HierarchyUserBranches {
    OFFICE: [HierarchyBranch!]
    DESK: [HierarchyBranch!]
    TEAM: [HierarchyBranch!]
    COMPANY: [HierarchyBranch!]
    BRAND: [HierarchyBranch!]
  }
`;
