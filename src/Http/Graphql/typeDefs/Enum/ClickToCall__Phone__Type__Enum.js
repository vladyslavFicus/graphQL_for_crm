const { gql } = require('apollo-server-express');

module.exports = gql`
  enum ClickToCall__Phone__Type__Enum {
    PHONE
    ADDITIONAL_PHONE
  }
`;
