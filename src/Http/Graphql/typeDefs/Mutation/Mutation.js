const { gql } = require('apollo-server-express');

module.exports = gql`
  type Mutation {
    authorization: AuthorizationMutation @nested
    asterisk: AsteriskMutation @nested
    emailTemplates: EmailTemplateMutation @nested
    notificationCenter: NotificationCenterMutation @nested
    partner: PartnerMutation @nested
  }
`;
