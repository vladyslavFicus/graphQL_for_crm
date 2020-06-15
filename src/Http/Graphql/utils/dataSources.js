const getBaseUrl = require('../../../utils/getBaseUrl');
const {
  AffiliateAPI,
  AsteriskAPI,
  Auth2API,
  BrandConfigAPI,
  EmailAPI,
  FilterSetsAPI,
  HierarchyAPI,
  NoteAPI,
  NotificationCenterAPI,
  OperatorAPI,
  PaymentAPI,
  ProfileViewAPI,
} = require('../dataSources');

module.exports = () => ({
  AffiliateAPI: new AffiliateAPI({ baseUrl: getBaseUrl('affiliate') }),
  AsteriskAPI: new AsteriskAPI({ baseUrl: getBaseUrl('') }),
  Auth2API: new Auth2API({ baseUrl: getBaseUrl('auth2') }),
  BrandConfigAPI: new BrandConfigAPI({ baseUrl: getBaseUrl('brand-config-service') }),
  EmailAPI: new EmailAPI({ baseUrl: getBaseUrl('email') }),
  FilterSetsAPI: new FilterSetsAPI({ baseUrl: getBaseUrl('filter-sets') }),
  HierarchyAPI: new HierarchyAPI({ baseUrl: getBaseUrl('hierarchy') }),
  NoteAPI: new NoteAPI({ baseUrl: getBaseUrl('note') }),
  NotificationCenterAPI: new NotificationCenterAPI({ baseUrl: getBaseUrl('notification') }),
  OperatorAPI: new OperatorAPI({ baseUrl: getBaseUrl('operator') }),
  PaymentAPI: new PaymentAPI({ baseUrl: getBaseUrl('payment') }),
  ProfileViewAPI: new ProfileViewAPI({ baseUrl: getBaseUrl('profileview') }),
});
