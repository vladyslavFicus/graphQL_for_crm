const { gql } = require('apollo-server-express');

module.exports = gql`
  type HierarchyTreeUser {
    uuid: String!
    operator: Operator
  }
`;
