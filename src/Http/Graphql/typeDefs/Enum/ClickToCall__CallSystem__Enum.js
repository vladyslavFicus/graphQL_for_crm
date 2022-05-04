const { gql } = require('apollo-server-express');

module.exports = gql`
  enum ClickToCall__CallSystem__Enum {
    COPERATO
    DIDLOGIC
    ASTERISK
    COMMPEAK
    CLEAR_VOICE
  }
`;
