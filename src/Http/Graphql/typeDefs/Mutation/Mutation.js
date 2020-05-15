const { gql } = require('apollo-server-express');

module.exports = gql`
  type Mutation {
    notificationCenter: NotificationCenterMutation @nested
    asterisk: AsteriskMutation @nested
  }
`;
