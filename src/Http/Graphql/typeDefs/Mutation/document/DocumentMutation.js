const { gql } = require('apollo-server-express');

module.exports = gql`
  type DocumentMutation {
    add(file: Upload!): UploadedFile!
    confirm(args: Document__Input): Boolean
    delete(uuid: String!): Boolean
    edit(args: Document__Input): Boolean
  }
`;
