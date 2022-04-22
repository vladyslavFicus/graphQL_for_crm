const { gql } = require('apollo-server-express');

module.exports = gql`
  enum Click2CallPhone__Type__Enum {
    PHONE
    ADDITIONAL_PHONE
  }
`;
