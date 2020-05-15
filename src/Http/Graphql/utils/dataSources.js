const config = require('config');
const { use } = require('@hrzn/apollo-datasource');
const {
  NotificationCenterAPI,
  OperatorAPI,
  ProfileAPI,
  AsteriskAPI,
  HierarchyAPI,
  AuthAPI,
} = require('../dataSources');

module.exports = () => ({
  ...use([NotificationCenterAPI, OperatorAPI, ProfileAPI, AsteriskAPI, HierarchyAPI, AuthAPI], {
    baseUrl: config.get('apiUrl'),
  })(),
});
