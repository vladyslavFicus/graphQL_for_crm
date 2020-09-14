const { gql } = require('apollo-server-express');

module.exports = gql`
  type HierarchyBranchUser {
    uuid: String!
    operator: Operator
  }
`;
