const { gql } = require('apollo-server-express');

module.exports = gql`
  type Mutation {
    authorization: AuthorizationMutation @nested
    asterisk: AsteriskMutation @nested
    brandConfig: BrandConfigMutation @nested
    emailTemplates: EmailTemplateMutation @nested
    filterSet: FilterSetMutation @nested
    notificationCenter: NotificationCenterMutation @nested
    partner: PartnerMutation @nested
  }
`;
