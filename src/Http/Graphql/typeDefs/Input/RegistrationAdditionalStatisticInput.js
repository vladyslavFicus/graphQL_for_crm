const { gql } = require('apollo-server-express');

module.exports = gql`
  input RegistrationAdditionalStatisticInput {
    from: String
    to: String
  }
`;
