const { gql } = require('apollo-server-express');

module.exports = gql`
  type HierarchyUser__statistics {
    totalSubordinatesCount: Int
  }

  type HierarchyUser {
    fullName: String
    operator: Operator
    operatorStatus: String
    parentBranches: [HierarchyBranch]
    parentUsers: [HierarchyUser]
    userType: String!
    uuid: String!
    acquisition: HierarchyUserAcquisition
    statistics: HierarchyUser__statistics
  }
`;
