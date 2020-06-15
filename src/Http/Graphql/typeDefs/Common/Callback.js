const { gql } = require('apollo-server-express');

module.exports = gql`
  enum Callback__StatusEnum {
    SUCCESS
    PENDING
    REJECTED
  }

  type Callback {
    _id: ID!
    callbackId: String!
    callbackTime: String!
    creationTime: String!
    updateTime: String!
    operatorId: String!
    status: Callback__StatusEnum!
    userId: String!
    reminder: String
    operator: Operator
    client: ProfileView
    note: Note
  }
`;
