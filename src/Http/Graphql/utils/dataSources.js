const getBaseUrl = require('../../../utils/getBaseUrl');
const {
  AffiliateAPI,
  AsteriskAPI,
  AuthAPI, // will be removed soon
  Auth2API,
  HierarchyAPI,
  EmailAPI,
  NotificationCenterAPI,
  OperatorAPI,
  ProfileAPI,
} = require('../dataSources');

module.exports = () => ({
  // New one
  AffiliateAPI: new AffiliateAPI({ baseUrl: getBaseUrl('affiliate') }),
  AsteriskAPI: new AsteriskAPI({ baseUrl: getBaseUrl('') }),
  AuthAPI: new AuthAPI({ baseUrl: getBaseUrl('auth') }), // will be removed
  Auth2API: new Auth2API({ baseUrl: getBaseUrl('auth2') }),

  EmailAPI: new EmailAPI({ baseUrl: getBaseUrl('') }),
  HierarchyAPI: new HierarchyAPI({ baseUrl: getBaseUrl('') }),
  NotificationCenterAPI: new NotificationCenterAPI({ baseUrl: getBaseUrl('') }),
  OperatorAPI: new OperatorAPI({ baseUrl: getBaseUrl('operator') }),
  ProfileAPI: new ProfileAPI({ baseUrl: getBaseUrl('') }),
});
