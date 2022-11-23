const { gql } = require('apollo-server-express');

module.exports = gql`  
  type ClientCallback {
    _id: ID!
    callbackId: String!
    callbackTime: String!
    creationTime: String!
    updateTime: String!
    operatorId: String!
    status: Callback__Status__Enum!
    userId: String!
    reminder: String
    operator: Operator
    client: ProfileView
    note: Note
  }
`;
