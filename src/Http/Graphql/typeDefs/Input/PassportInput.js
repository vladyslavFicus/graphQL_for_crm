const { gql } = require('apollo-server-express');

module.exports = gql`
  input PassportInput {
    countryOfIssue: String
    countrySpecificIdentifier: String
    countrySpecificIdentifierType: String
    expirationDate: String
    issueDate: String
    number: String
  }
`;
