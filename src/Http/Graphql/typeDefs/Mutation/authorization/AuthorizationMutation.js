const { gql } = require('apollo-server-express');

module.exports = gql`
  type AuthorizationMutation {
    signIn(login: String!, password: String!): SignIn @response
    chooseDepartment(brand: String!, department: String!, role: String!): ChooseDepartment @response
  }
`;
