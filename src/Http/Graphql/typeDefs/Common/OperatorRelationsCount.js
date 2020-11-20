const { gql } = require('apollo-server-express');

module.exports = gql`
  type OperatorRelationsCount {
    customersCount: Int
    leadsCount: Int
    rulesCount: Int
  }
`;
