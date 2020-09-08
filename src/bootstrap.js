const platform = require('../config/platform');
const brands = require('../config/brands');
const permissions = require('../config/permissions');
const Logger = require('../src/lib/Logger');

module.exports = async () => {
  // ========================================================================== //
  // ========== Load platform configuration and init logger at first ========== //
  // ========================================================================== //

  // Load platform configuration
  await platform.load();

  // Init logger to use remote stream
  Logger.init();


  // ========================================================================== //
  // ===== Load any configuration depends from platform config and logger ===== //
  // ========================================================================== //

  // Load brands configuration from zookeeper
  await brands.load();

  // Send backoffice-graphql permissions to auth
  await permissions.send();

  // Load permissions configuration from zookeeper
  await permissions.load();
};
