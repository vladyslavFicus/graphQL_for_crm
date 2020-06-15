const { gql } = require('apollo-server-express');

module.exports = gql`
  type CallbackMutation {
    create(userId: String!, reminder: String, operatorId: String!, callbackTime: String): Callback @response

    update(
      callbackId: String!
      callbackTime: String
      operatorId: String
      status: Callback__StatusEnum
      reminder: String
    ): Success
  }
`;
