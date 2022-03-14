const { gql } = require('apollo-server-express');

module.exports = gql`
  type OperatorAccess {
    uuid: String!
    readableRoles: [String!]!
    writeableRoles: [String!]!
    accessibleGroupNames: [String!]!
  }

  type TradingEngineOperator {
    uuid: String!
    firstName: String!
    lastName: String!
    email: String!
    phone: String
    role: TradingEngine__OperatorRoles__Enum!
    status: TradingEngine__OperatorStatuses__Enum!
    registrationDate: String!
    groupNames: [String!]!
  }
`;
