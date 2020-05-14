const { gql } = require('apollo-server-express');

module.exports = gql`
  type SuccessType {
    success: Boolean!
    error: ErrorType
  }
`;
