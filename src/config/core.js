const path = require('path');
const ymlReader = require('yamljs');

const { NAS_PROJECT, SECRET_PATH = '/backoffice-graphql/lib/etc/' } = process.env;

if (!NAS_PROJECT) {
  throw new Error('Missing required environment variable "NAS_PROJECT"');
}

let platform;

try {
  platform = ymlReader.load(path.resolve(SECRET_PATH, 'application-config.yml'));
} catch (e) {
  platform = ymlReader.load(path.resolve(SECRET_PATH, `application-${NAS_PROJECT}.yml`));
}

module.exports = {
  platform,
};
