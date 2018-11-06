const zookeeper = require('node-zookeeper-client');
const Logger = require('./logger');
const defaultEventLogger = e => Logger.info({ message: `Zookeeper.Event: ${e}` });

module.exports = (client, path, eventLogger = defaultEventLogger) => {
  return new Promise((resolve, reject) => {
    client.getData(path, eventLogger, (err, data) => {
      if (err) {
        if (err.getCode() === zookeeper.Exception.NO_NODE) {
          return resolve(undefined);
        }

        return reject(err);
      }

      return resolve(data.toString());
    });
  });
};
