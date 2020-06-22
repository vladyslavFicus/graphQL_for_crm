const { gql } = require('apollo-server-express');

module.exports = gql`
  type Mutation {
    auth: AuthMutation @nested
    authorization: AuthorizationMutation @nested
    asterisk: AsteriskMutation @nested
    brandConfig: BrandConfigMutation @nested
    callback: CallbackMutation @nested
    emailTemplates: EmailTemplateMutation @nested
    file: FileMutation @nested
    filterSet: FilterSetMutation @nested
    leads: LeadMutation @nested
    note: NoteMutation @nested
    notificationCenter: NotificationCenterMutation @nested
    partner: PartnerMutation @nested
    payment: PaymentMutation @nested
    profile: ProfileMutation @nested
    operator: OperatorMutation @nested
    tradingAccount: TradingAccountMutation @nested
    tradingActivity: TradingActivityMutation @nested
  }
`;
