const { gql } = require('apollo-server-express');

module.exports = gql`
  type ClickToCallMutation {
    newtel: NewtelMutation @nested
    didlogic: DidLogicMutation @nested
    commpeak: CommpeakMutation @nested
    coperato: CoperatoMutation @nested
    squaretalk: SquaretalkMutation @nested
    globalcall: GlobalcallMutation @nested
  }
`;
