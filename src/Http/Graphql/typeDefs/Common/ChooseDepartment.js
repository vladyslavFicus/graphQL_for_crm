const { gql } = require('apollo-server-express');

module.exports = gql`
  type ChooseDepartment {
    uuid: String
    token: String
  }
`;
