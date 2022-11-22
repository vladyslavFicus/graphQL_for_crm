const { gql } = require('apollo-server-express');

module.exports = gql`
  type FullSms__Number {
    number: String!
    country: String!
  }
`;
