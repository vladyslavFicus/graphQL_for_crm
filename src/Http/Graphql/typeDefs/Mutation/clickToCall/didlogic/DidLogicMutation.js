const { gql } = require('apollo-server-express');

module.exports = gql`
  type DidLogicMutation {
    createCall(
      uuid: String!
      phoneType: Click2CallPhone__Type__Enum!
      customerType: Click2CallCustomer__Type__Enum!
    ): Boolean
  }
`;
