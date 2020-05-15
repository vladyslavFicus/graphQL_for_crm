const { gql } = require('apollo-server-express');

module.exports = gql`
  enum Desk__Types {
    RETENTION
    SALES
  }
`;
