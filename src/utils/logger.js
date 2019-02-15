const bunyan = require('bunyan');
const bunyanFormat = require('bunyan-format');

const config = require('../config');
const BunyanToGelfStream = require('./BunyanToGelfStream');

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
  streams.push({
    type: 'raw',
    stream: new BunyanToGelfStream({
      host: config.logstash.host,
      port: config.logstash.port,
    }),
  });
}

const Logger = bunyan.createLogger({
  name: config.name,
  service: config.name,
  streams,
  serializers: bunyan.stdSerializers,
});

module.exports = Logger;
