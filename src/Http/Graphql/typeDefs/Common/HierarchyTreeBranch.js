const { gql } = require('apollo-server-express');

module.exports = gql`
  type HierarchyTreeBranch {
    uuid: String
    name: String
    brandId: String
    branchType: String
    managerUuid: String
    manager: Operator
    usersCount: Int
    childrenCount: Int
  }
`;
