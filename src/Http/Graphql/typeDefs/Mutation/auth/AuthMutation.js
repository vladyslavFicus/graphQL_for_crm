const { gql } = require('apollo-server-express');

module.exports = gql`
  type AuthMutation {
    changePassword(clientUuid: String!, newPassword: String!): Boolean
    changeOperatorPassword(operatorUuid: String!, newPassword: String!): Boolean
    changeUnauthorizedPassword(uuid: String!, currentPassword: String!, newPassword: String!): Boolean
    chooseDepartment(brand: String!, department: String!, role: String!): ChooseDepartment
    resetUserPassword(userUuid: String!): Boolean
    resetPassword(password: String!, token: String!): Boolean
    unlockLogin(uuid: String!): Boolean
    logout(inactiveSeconds: Int): Boolean
    signIn(login: String!, password: String!, otp: String): SignIn
    tokenRenew: TokenRenew
    addAuthority(uuid: String!, department: String!, role: String!): Boolean
    removeAuthority(uuid: String!, department: String!, role: String!): Boolean
    updateAuthorityActions(department: String!, role: String!, actions: [String]!, isPermitted: Boolean!): Boolean
    resetPermission(department: String!, role: String!): Boolean
  }
`;
