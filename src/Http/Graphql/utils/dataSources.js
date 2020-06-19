const getBaseUrl = require('../../../utils/getBaseUrl');
const {
  AccountViewAPI,
  AffiliateAPI,
  AsteriskAPI,
  AuditAPI,
  Auth2API,
  BrandConfigAPI,
  CallbackAPI,
  EmailAPI,
  FilterSetsAPI,
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
} = require('../dataSources');

module.exports = () => ({
  AccountViewAPI: new AccountViewAPI({ baseUrl: getBaseUrl('accountview') }),
  AffiliateAPI: new AffiliateAPI({ baseUrl: getBaseUrl('affiliate') }),
  AsteriskAPI: new AsteriskAPI({ baseUrl: getBaseUrl('') }), // # Не понятно какой baseUrl использовать для AsteriskAPI
  AuditAPI: new AuditAPI({ baseUrl: getBaseUrl('audit') }),
  Auth2API: new Auth2API({ baseUrl: getBaseUrl('auth2') }),
  BrandConfigAPI: new BrandConfigAPI({ baseUrl: getBaseUrl('brand-config-service') }),
  CallbackAPI: new CallbackAPI({ baseUrl: getBaseUrl('callback') }),
  EmailAPI: new EmailAPI({ baseUrl: getBaseUrl('email') }),
  FilterSetsAPI: new FilterSetsAPI({ baseUrl: getBaseUrl('filter-sets') }),
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
});
