const { gql } = require('apollo-server-express');

module.exports = gql`
  type ErrorType {
    error: String
    fields_errors: Object
    errorParameters: Object
  }
`;
