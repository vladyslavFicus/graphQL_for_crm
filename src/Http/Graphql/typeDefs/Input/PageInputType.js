const { gql } = require('apollo-server-express');

module.exports = gql`
  input PageInputType {
    from: Int
    size: Int
    sorts: [SortInputType]
  }
`;
