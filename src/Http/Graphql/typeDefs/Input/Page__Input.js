const { gql } = require('apollo-server-express');

module.exports = gql`
  input Page__Input {
    from: Int
    size: Int
    sorts: [Sort__Input]
  }
`;
