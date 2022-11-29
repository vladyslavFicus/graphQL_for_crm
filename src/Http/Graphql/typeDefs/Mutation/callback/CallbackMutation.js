const { gql } = require('apollo-server-express');

module.exports = gql`
  type CallbackMutation {
    createClientCallback(
      userId: String!
      reminder: String
      operatorId: String!
      callbackTime: String
    ): ClientCallback

    updateClientCallback(
      callbackId: String!
      callbackTime: String
      operatorId: String!
      status: Callback__Status__Enum
      reminder: String
    ): ClientCallback

    deleteClientCallback(callbackId: String!): Boolean

    createLeadCallback(
      userId: String!
      reminder: String
      operatorId: String!
      callbackTime: String
    ): LeadCallback

    updateLeadCallback(
      callbackId: String!
      callbackTime: String
      operatorId: String!
      status: Callback__Status__Enum
      reminder: String
    ): LeadCallback

    deleteLeadCallback(callbackId: String!): Boolean
  }
`;
