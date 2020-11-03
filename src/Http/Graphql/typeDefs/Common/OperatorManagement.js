const { gql } = require('apollo-server-express');

module.exports = gql`
  type OperatorManagement {
    clients: Int
    leads: Int
    salesRules: Int
  }
`;
