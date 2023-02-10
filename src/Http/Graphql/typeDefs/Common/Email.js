const { gql } = require('apollo-server-express');

module.exports = gql`
  type Email {
    id: ID!
    name: String!
    subject: String!
    text: String!
  }
`;
