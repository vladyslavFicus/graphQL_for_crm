const { gql } = require('apollo-server-express');

module.exports = gql`  
  type CallHistory {
    uuid: ID!
    operatorUuid: String!
    createdAt: String!
    callSystem: CallSystem__Types__Enum!
    operator: Operator!
  }
`;
