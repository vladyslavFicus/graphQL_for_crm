const { gql } = require('apollo-server-express');

module.exports = gql`
  type ClickToCallMutation {
    asterisk: AsteriskMutation @nested
    didlogic: DidLogicMutation @nested
  }
`;
