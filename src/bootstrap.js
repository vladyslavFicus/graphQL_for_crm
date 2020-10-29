const infra = require('../config/infra');
const versions = require('../config/versions');
const brands = require('../config/brands');
const permissions = require('../config/permissions');
const Logger = require('../src/lib/Logger');

module.exports = async () => {
  // ========================================================================== //
  // ========== Load infrastructure configuration and init logger at first ========== //
  // ========================================================================== //

  // Load infrastructure configuration
  await infra.load();

  // Load env versions configuration
  await versions.load();

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
