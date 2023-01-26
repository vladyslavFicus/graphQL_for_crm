const { gql } = require('apollo-server-express');

module.exports = gql`
  type HierarchyBranch {
    branchType: String!
    brandId: String
    country: String
    defaultBranch: String
    defaultUser: String
    deskType: Desk__Types__Enum
    isDefault: Boolean
    language: String
    managers: [String]
    name: String!
    operators: [Operator!]
    parentBranch: HierarchyBranch
    uuid: String!
  }
`;
