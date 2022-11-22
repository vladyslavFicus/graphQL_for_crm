const { gql } = require('apollo-server-express');

module.exports = gql`
  type FullSmsMutation {
    sendSms(
      uuid: String!
      field: String!
      type: String!
      from: String!
      message: String!
    ): Boolean
  }
`;
