const { gql } = require('apollo-server-express');

module.exports = gql`
  enum Rule__Type__Enum {
    LEAD
    PROFILE
  }
`;
