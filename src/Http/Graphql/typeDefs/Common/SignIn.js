const { gql } = require('apollo-server-express');

module.exports = gql`
  type SignIn {
    uuid: String
    token: String
    brandToAuthorities: JSONObject
  }
`;
