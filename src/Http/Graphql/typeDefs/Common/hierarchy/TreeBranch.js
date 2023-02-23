const { gql } = require('apollo-server-express');

module.exports = gql`
  type HierarchyTreeBranch {
    uuid: String!
    name: String!
    brandId: String!
    branchType: String!
    managerUuids: [String!]
    managers: [Operator!]
    usersCount: Int!
    childrenCount: Int!
  }
`;
