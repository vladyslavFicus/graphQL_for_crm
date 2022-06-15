const { gql } = require('apollo-server-express');

module.exports = gql`
  enum ClickToCall__CallSystem__Enum {
    COPERATO
    DIDLOGIC
    NEWTEL
    COMMPEAK
    CLEAR_VOICE
  }
`;
