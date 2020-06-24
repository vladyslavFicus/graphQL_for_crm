const { gql } = require('apollo-server-express');

module.exports = gql`
  input RegistrationStatisticDateRange__Input {
    from: String
    to: String
  }
`;
