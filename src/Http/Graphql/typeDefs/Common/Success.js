const { gql } = require('apollo-server-express');

module.exports = gql`
  type Success {
    success: Boolean!
    error: Error
  }
`;
