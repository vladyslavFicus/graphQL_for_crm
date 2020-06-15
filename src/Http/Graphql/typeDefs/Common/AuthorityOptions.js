const { gql } = require('apollo-server-express');

module.exports = gql`
  type AuthorityOptions {
    authoritiesOptions: JSONObject
  }
`;
