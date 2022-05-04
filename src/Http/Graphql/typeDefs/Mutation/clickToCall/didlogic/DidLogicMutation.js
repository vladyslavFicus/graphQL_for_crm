const { gql } = require('apollo-server-express');

module.exports = gql`
  type DidLogicMutation {
    createCall(
      uuid: String!
      phoneType: ClickToCall__Phone__Type__Enum!
      customerType: ClickToCall__Customer__Type__Enum!
    ): Boolean
  }
`;
