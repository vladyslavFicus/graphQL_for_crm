const { gql } = require('apollo-server-express');

module.exports = gql`
  type Mutation {
    auth: AuthMutation @nested
    authorization: AuthorizationMutation @nested
    asterisk: AsteriskMutation @nested
    brandConfig: BrandConfigMutation @nested
    callback: CallbackMutation @nested
    emailTemplates: EmailTemplateMutation @nested
    filterSet: FilterSetMutation @nested
    note: NoteMutation @nested
    notificationCenter: NotificationCenterMutation @nested
    partner: PartnerMutation @nested
    payment: PaymentMutation @nested
    operator: OperatorMutation @nested
  }
`;
