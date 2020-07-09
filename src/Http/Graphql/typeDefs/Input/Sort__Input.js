const { gql } = require('apollo-server-express');

module.exports = gql`
  input Sort__Input {
    column: String
    direction: String
  }
`;
