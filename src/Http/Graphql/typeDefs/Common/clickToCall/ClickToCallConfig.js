const { gql } = require('apollo-server-express');

module.exports = gql`
  type ClickToCallConfig__Prefix {
    label: String!
    prefix: String!
  }

  type ClickToCallConfig__AdditionalFields {
    phone: String
  }

  type ClickToCallConfig {
    callSystem: ClickToCall__CallSystem__Enum!
    prefixes: [ClickToCallConfig__Prefix!]!
    additionalFields(
      uuid: String!
      phoneType: ClickToCall__Phone__Type__Enum!
      customerType: ClickToCall__Customer__Type__Enum!
    ): ClickToCallConfig__AdditionalFields
  }
`;
