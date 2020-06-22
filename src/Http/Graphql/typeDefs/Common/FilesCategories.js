const { gql } = require('apollo-server-express');

module.exports = gql`
  type FilesCategories {
    DOCUMENT_VERIFICATION: [String]
    ADDRESS_VERIFICATION: [String]
    OTHER: [String]
  }
`;
