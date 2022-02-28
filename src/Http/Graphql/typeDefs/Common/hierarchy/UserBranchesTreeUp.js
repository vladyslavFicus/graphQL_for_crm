const { gql } = require('apollo-server-express');

module.exports = gql`
    type HierarchyUserBranchesTreeUp {
        uuid: String!
        brandId: String!
        branchType: String!
        name: String!
        parentBranch: HierarchyUserBranchesTreeUp,
    }
`;
