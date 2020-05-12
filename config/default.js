require('../src/env');

// Need to load brands config later for config mutation. (node-confg immutable by design)
process.env.ALLOW_CONFIG_MUTATIONS = true;

module.exports = {
  name: 'backoffice-graphql',
  port: 3000,
};
