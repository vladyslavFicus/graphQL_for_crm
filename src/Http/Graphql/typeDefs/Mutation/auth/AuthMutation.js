const { gql } = require('apollo-server-express');

module.exports = gql`
  type AuthMutation {
    changePassword(clientUuid: String!, newPassword: String!): Boolean
    changeOperatorPassword(operatorUuid: String!, newPassword: String!): Boolean
    chooseDepartment(brand: String!, department: String!, role: String!): ChooseDepartment @response
    resetUserPassword(userUuid: String!): Boolean
    resetPassword(password: String!, token: String!): Boolean
    unlockLogin(uuid: String!): Boolean
    logout: Boolean
    signIn(login: String!, password: String!): SignIn @response
    tokenRenew: TokenRenew
    addAuthority(uuid: String!, department: String!, role: String!): Boolean
    removeAuthority(uuid: String!, department: String!, role: String!): Boolean
  }
`;
