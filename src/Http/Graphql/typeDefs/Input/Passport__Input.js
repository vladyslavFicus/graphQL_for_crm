const { gql } = require('apollo-server-express');

module.exports = gql`
  input Passport__Input {
    countryOfIssue: String
    countrySpecificIdentifier: String
    countrySpecificIdentifierType: String
    expirationDate: String
    issueDate: String
    number: String
  }
`;
