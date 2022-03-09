const getBaseUrl = require('../../../utils/getBaseUrl');
const {
  AccountViewAPI,
  AffiliateAPI,
  AsteriskAPI,
  AttachmentsAPI,
  AuditAPI,
  Auth2API,
  CallbackAPI,
  CommpeakAPI,
  CoperatoAPI,
  DidLogicAPI,
  CoperatoSmsAPI,
  EmailAPI,
  OperatorConfigAPI,
  HierarchyAPI,
  HierarchyUpdaterAPI,
  LeadAPI,
  LeadUpdaterAPI,
  NoteAPI,
  NotificationCenterAPI,
  OperatorAPI,
  PaymentAPI,
  ProfileAPI,
  ProfileViewAPI,
  TradingAccountAPI,
  TradingActivityAPI,
  RuleProfileAPI,
  ReferralAPI,
  DistributionRuleAPI,
  AnalyticsAPI,
  Analytics,
  TradingEngineAPI,
  BrandConfigAPI,
  LiquidityProviderAPI,
} = require('../dataSources');

module.exports = () => ({
  AccountViewAPI: new AccountViewAPI({ baseUrl: getBaseUrl('accountview') }),
  AffiliateAPI: new AffiliateAPI({ baseUrl: getBaseUrl('affiliate') }),
  AsteriskAPI: new AsteriskAPI({ baseUrl: '' }),
  AttachmentsAPI: new AttachmentsAPI({ baseUrl: getBaseUrl('attachments') }),
  AuditAPI: new AuditAPI({ baseUrl: getBaseUrl('audit') }),
  Auth2API: new Auth2API({ baseUrl: getBaseUrl('auth2') }),
  CallbackAPI: new CallbackAPI({ baseUrl: getBaseUrl('callback') }),
  CommpeakAPI: new CommpeakAPI({ baseUrl: '' }),
  CoperatoAPI: new CoperatoAPI({ baseUrl: '' }),
  DidLogicAPI: new DidLogicAPI({ baseUrl: '' }),
  CoperatoSmsAPI: new CoperatoSmsAPI({ baseUrl: '' }),
  EmailAPI: new EmailAPI({ baseUrl: getBaseUrl('email') }),
  OperatorConfigAPI: new OperatorConfigAPI({ baseUrl: getBaseUrl('operator-config') }),
  HierarchyAPI: new HierarchyAPI({ baseUrl: getBaseUrl('hierarchy') }),
  HierarchyUpdaterAPI: new HierarchyUpdaterAPI({ baseUrl: getBaseUrl('hierarchy-updater') }),
  LeadAPI: new LeadAPI({ baseUrl: getBaseUrl('lead') }),
  LeadUpdaterAPI: new LeadUpdaterAPI({ baseUrl: getBaseUrl('lead-updater') }),
  NoteAPI: new NoteAPI({ baseUrl: getBaseUrl('note') }),
  NotificationCenterAPI: new NotificationCenterAPI({ baseUrl: getBaseUrl('notification') }),
  OperatorAPI: new OperatorAPI({ baseUrl: getBaseUrl('operator') }),
  PaymentAPI: new PaymentAPI({ baseUrl: getBaseUrl('payment') }),
  ProfileAPI: new ProfileAPI({ baseUrl: getBaseUrl('profile') }),
  ProfileViewAPI: new ProfileViewAPI({ baseUrl: getBaseUrl('profileview') }),
  TradingAccountAPI: new TradingAccountAPI({ baseUrl: getBaseUrl('trading-account') }),
  TradingActivityAPI: new TradingActivityAPI({ baseUrl: getBaseUrl('trading-activity') }),
  RuleProfileAPI: new RuleProfileAPI({ baseUrl: getBaseUrl('rules-profile') }),
  ReferralAPI: new ReferralAPI({ baseUrl: getBaseUrl('referral') }),
  DistributionRuleAPI: new DistributionRuleAPI({ baseUrl: getBaseUrl('clients-distributor') }),
  AnalyticsAPI: new AnalyticsAPI({ baseUrl: getBaseUrl('analytics-api') }),
  Analytics: new Analytics({ baseUrl: getBaseUrl('analytics') }),
  TradingEngineAPI: new TradingEngineAPI({ baseUrl: getBaseUrl('we-trading') }),
  BrandConfigAPI: new BrandConfigAPI({ baseUrl: getBaseUrl('brand-config-service') }),
  LiquidityProviderAPI: new LiquidityProviderAPI({ baseUrl: getBaseUrl('liquidity-provider-adapter') }),
});
