const { gql } = require('apollo-server-express');

module.exports = gql`
  type Document {
    documentType: String!
    verifiedBy: String
    verificationTime: String
    verificationStatus: String
    files: [File!]!
  }

  type ClientFile {
    verificationType: String!
    attemptsLeft: Int!
    documents: [Document!]!
  }
`;
