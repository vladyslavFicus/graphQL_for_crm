const { gql } = require('apollo-server-express');

module.exports = gql`
  type CoperatoMutation {
    createCall(
      uuid: String!
      phoneType: ClickToCall__Phone__Type__Enum!
      customerType: ClickToCall__Customer__Type__Enum!
      prefix: String!
    ): Boolean
  }
`;
