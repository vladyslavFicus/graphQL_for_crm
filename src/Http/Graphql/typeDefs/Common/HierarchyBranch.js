const { gql } = require('apollo-server-express');

module.exports = gql`
  type HierarchyBranch {
    branchType: String!
    brandId: String
    country: String
    defaultBranch: String
    defaultUser: String
    deskType: Desk__Types
    isDefault: Boolean
    language: String
    manager: String
    name: String!
    operator: Operator
    parentBranch: HierarchyBranch
    uuid: String!
  }
`;
