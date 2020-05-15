const { gql } = require('apollo-server-express');

module.exports = gql`
  input SortInputType {
    column: String
    direction: String
  }
`;
