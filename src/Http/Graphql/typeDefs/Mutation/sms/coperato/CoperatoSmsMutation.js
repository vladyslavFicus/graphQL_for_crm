const { gql } = require('apollo-server-express');

module.exports = gql`
  type CoperatoSmsMutation {
    sendSms(
      uuid: String!
      field: String!
      type: String!
      from: String!
      message: String!
    ): Boolean
  }
`;
