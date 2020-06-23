const { gql } = require('apollo-server-express');

module.exports = gql`
  type AuthMutation {
    changePassword(clientUuid: String!, newPassword: String!): Success
    changeOperatorPassword(operatorUuid: String!, newPassword: String!): Success
    chooseDepartment(brand: String!, department: String!, role: String!): ChooseDepartment @response
    resetUserPassword(userUuid: String!): Success
    resetPassword(password: String!, token: String!): Success
    unlockLogin(uuid: String!): Success
    logout: Success
    signIn(login: String!, password: String!): SignIn @response
    tokenRenew: TokenRenew
    addAuthority(uuid: String!, department: String!, role: String!): Success
    removeAuthority(uuid: String!, department: String!, role: String!): Success
  }
`;
