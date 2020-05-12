const platform = require('../config/platform');
const zookeeper = require('../config/zookeeper');
const Logger = require('../src/utils/logger');

module.exports = async app => {
  // Load platform configuration
  await platform.load();

  // Load additional configuration from zookeeper
  await zookeeper.load();

  // Init logger to use remote stream
  Logger.init();
};
