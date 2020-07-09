const { gql } = require('apollo-server-express');

module.exports = gql`
  type Error {
    error: String
    fields_errors: Object
    errorParameters: Object
  }
`;
