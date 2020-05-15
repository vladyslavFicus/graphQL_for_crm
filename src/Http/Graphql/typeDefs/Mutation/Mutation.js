const { gql } = require('apollo-server-express');

module.exports = gql`
  type Mutation {
    emailTemplates: EmailTemplateMutation @nested
    notificationCenter: NotificationCenterMutation @nested
    asterisk: AsteriskMutation @nested
  }
`;
