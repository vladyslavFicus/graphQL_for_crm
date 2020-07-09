const bunyan = require('bunyan');
const bunyanFormat = require('bunyan-format');
const BunyanToGelfStream = require('bunyan-gelf');
const config = require('config');

const streams = [
  {
    level: 'info',
    stream: bunyanFormat({
      outputMode: 'long',
      levelInString: true,
      color: true,
    }),
  },
];

const Logger = bunyan.createLogger({
  name: config.name,
  service: config.name,
  streams,
  serializers: bunyan.stdSerializers,
});

/**
 * Init logger to use remote stream
 */
Logger.init = () => {
  if (process.env.NODE_ENV === 'production') {
    Logger.addStream({
      type: 'raw',
      stream: new BunyanToGelfStream({
        host: config.logstash.host,
        port: config.logstash.port,
        protocol: 'tcp',
      }),
    });
  }
};

module.exports = Logger;
