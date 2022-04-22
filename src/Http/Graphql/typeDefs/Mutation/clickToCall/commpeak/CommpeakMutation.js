const { gql } = require('apollo-server-express');

module.exports = gql`
  type CommpeakMutation {
    createCall(
      uuid: String!
      phoneType: Click2CallPhone__Type__Enum!
      customerType: Click2CallCustomer__Type__Enum!
      prefix: String!
    ): Boolean
  }
`;
