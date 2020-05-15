const config = require('config');
const { use } = require('@hrzn/apollo-datasource');
const {
  NotificationCenterAPI,
  OperatorAPI,
  ProfileAPI,
  AsteriskAPI,
  HierarchyAPI,
  AuthAPI,
  EmailAPI,
} = require('../dataSources');

module.exports = () => ({
  ...use([NotificationCenterAPI, OperatorAPI, ProfileAPI, AsteriskAPI, HierarchyAPI, AuthAPI, EmailAPI], {
    baseUrl: config.get('apiUrl'),
  })(),
});
