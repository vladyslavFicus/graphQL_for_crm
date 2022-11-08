const { gql } = require('apollo-server-express');

module.exports = gql`  
  type CallHistory {
    uuid: ID!
    operatorUuid: String!
    createdAt: String!
    callSystem: String!
    operator: Operator!
    callStatus: String!
    finishedAt: String
    duration: String
  }
`;
