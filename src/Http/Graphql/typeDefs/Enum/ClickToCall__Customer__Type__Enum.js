const { gql } = require('apollo-server-express');

module.exports = gql`
  enum ClickToCall__Customer__Type__Enum {
    PROFILE
    LEAD
  }
`;
