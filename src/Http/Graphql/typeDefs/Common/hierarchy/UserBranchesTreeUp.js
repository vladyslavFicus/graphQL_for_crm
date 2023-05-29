const { gql } = require('apollo-server-express');

module.exports = gql`
  type UserBranchesTreeUp__Branch {
    uuid: String!
    brandId: String!
    branchType: String!
    name: String!
    parentBranch: UserBranchesTreeUp__Branch,
  }

  type UserBranchesTreeUp {
    branches: [UserBranchesTreeUp__Branch!]!
    statistics: HierarchyUser__Statistics!
  }
`;
