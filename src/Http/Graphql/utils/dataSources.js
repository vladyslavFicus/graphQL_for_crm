const getBaseUrl = require('../../../utils/getBaseUrl');
const {
  AsteriskAPI,
  AuthAPI,
  HierarchyAPI,
  EmailAPI,
  NotificationCenterAPI,
  OperatorAPI,
  ProfileAPI,
} = require('../dataSources');

module.exports = () => ({
  AsteriskAPI: new AsteriskAPI({ baseUrl: getBaseUrl('') }),
  AuthAPI: new AuthAPI({ baseUrl: getBaseUrl('') }),
  EmailAPI: new EmailAPI({ baseUrl: getBaseUrl('') }),
  HierarchyAPI: new HierarchyAPI({ baseUrl: getBaseUrl('') }),
  NotificationCenterAPI: new NotificationCenterAPI({ baseUrl: getBaseUrl('') }),
  OperatorAPI: new OperatorAPI({ baseUrl: getBaseUrl('') }),
  ProfileAPI: new ProfileAPI({ baseUrl: getBaseUrl('') }),
});
