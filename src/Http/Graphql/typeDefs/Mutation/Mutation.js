const { gql } = require('apollo-server-express');

module.exports = gql`
  type Mutation {
    auth: AuthMutation @nested
    brandConfig: BrandConfigMutation @nested
    callback: CallbackMutation @nested
    clickToCall: ClickToCallMutation @nested
    emailTemplates: EmailTemplateMutation @nested
    file: FileMutation @nested
    filterSet: FilterSetMutation @nested
    hierarchy: HierarchyMutation @nested
    leads: LeadMutation @nested
    note: NoteMutation @nested
    notificationCenter: NotificationCenterMutation @nested
    partner: PartnerMutation @nested
    payment: PaymentMutation @nested
    profile: ProfileMutation @nested
    rule: RuleMutation @nested
    distributionRule: DistributionRuleMutation @nested
    operator: OperatorMutation @nested
    tradingAccount: TradingAccountMutation @nested
    tradingActivity: TradingActivityMutation @nested
  }
`;
