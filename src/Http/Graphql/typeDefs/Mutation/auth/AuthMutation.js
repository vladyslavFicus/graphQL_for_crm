const { gql } = require('apollo-server-express');

module.exports = gql`
  type AuthMutation {
    changePassword(clientUuid: String!, newPassword: String!): Success
    changeOperatorPassword(operatorUuid: String!, newPassword: String!): Success
    resetUserPassword(userUuid: String!): Success
    resetPassword(password: String!, token: String!): Success
    unlockLogin(uuid: String!): Success
    logout: Success
    tokenRenew: TokenRenew
  }
`;
