const bunyan = require('bunyan');
const bunyanFormat = require('bunyan-format');

const config = require('../config');

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

if (process.env.NODE_ENV === 'production') {
  const gelfStream = require('gelf-stream');

  streams.push({
    type: 'raw',
    stream: gelfStream.forBunyan(config.logstash.host, config.logstash.port),
  });
}

const Logger = bunyan.createLogger({
  name: config.name,
  service: config.name,
  streams,
  serializers: bunyan.stdSerializers,
});

module.exports = Logger;
