const { gql } = require('apollo-server-express');

module.exports = gql`
  enum CallSystem__Types__Enum {
    COMMPEAK
    COPERATO
    DIDLOGIC
    ASTERISK
  }
`;
