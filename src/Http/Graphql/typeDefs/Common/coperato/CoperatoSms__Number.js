const { gql } = require('apollo-server-express');

module.exports = gql`
  type CoperatoSms__Number {
    number: String
    country: String
  }
`;
