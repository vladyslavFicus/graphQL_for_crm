const { gql } = require('apollo-server-express');

module.exports = gql`
  type Feed {
    id: String
    ip: String
    authorFullName: String!
    authorUuid: String!
    brandId: String
    creationDate: String!
    details: String
    targetFullName: String
    targetUuid: String!
    type: String!
    uuid: String!
  }
`;
