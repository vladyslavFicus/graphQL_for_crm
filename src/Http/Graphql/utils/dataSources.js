const config = require('config');
const { use } = require('@hrzn/apollo-datasource');
const { NotificationCenterAPI, OperatorAPI, AsteriskAPI } = require('../dataSources');

module.exports = () => ({
  ...use([NotificationCenterAPI, OperatorAPI, AsteriskAPI], { baseUrl: config.get('apiUrl') })(),
});
