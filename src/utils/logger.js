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

  const raven = require('raven');
  const sentryStream = require('bunyan-sentry-stream');
  const git = require('git-rev-sync');
  const client = new raven.Client(config.sentry.dsn, {
    captureUnhandledRejections: true,
    release: git.long(),
    environment: process.env.NAS_PROJECT,
  });

  streams.push(sentryStream(client));
}

const Logger = bunyan.createLogger({
  name: config.name,
  service: config.name,
  streams,
});

module.exports = Logger;
