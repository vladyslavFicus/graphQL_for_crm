const getBaseUrl = require('../../../utils/getBaseUrl');
const {
  AffiliateAPI,
  AsteriskAPI,
  AuthAPI, // will be removed soon
  HierarchyAPI,
  EmailAPI,
  NotificationCenterAPI,
  OperatorAPI,
  ProfileAPI,
} = require('../dataSources');

module.exports = () => ({
  // New one
  AffiliateAPI: new AffiliateAPI({ baseUrl: getBaseUrl('affiliate') }),

  // Don't know what baseUrl needed this service
  AsteriskAPI: new AsteriskAPI({ baseUrl: getBaseUrl('') }),

  // will be removed
  AuthAPI: new AuthAPI({ baseUrl: getBaseUrl('auth') }),

  // Old one but need to check all of those
  EmailAPI: new EmailAPI({ baseUrl: getBaseUrl('') }),
  HierarchyAPI: new HierarchyAPI({ baseUrl: getBaseUrl('') }),
  NotificationCenterAPI: new NotificationCenterAPI({ baseUrl: getBaseUrl('') }),
  OperatorAPI: new OperatorAPI({ baseUrl: getBaseUrl('operator') }),
  ProfileAPI: new ProfileAPI({ baseUrl: getBaseUrl('') }),
});
