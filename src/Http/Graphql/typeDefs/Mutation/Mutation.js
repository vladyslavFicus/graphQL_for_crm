const { gql } = require('apollo-server-express');

module.exports = gql`
  type Mutation {
    asterisk: AsteriskMutation @nested
    emailTemplates: EmailTemplateMutation @nested
    notificationCenter: NotificationCenterMutation @nested
    partner: PartnerMutation @nested
  }
`;
