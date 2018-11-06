const yamlReader = require('yamljs');

const application = yamlReader.load('./application.yml');

const { NAS_PROJECT } = process.env;
const SECRET_PATH = process.env.SECRET_PATH || `/${application.name}/lib/etc`;

const platform = yamlReader.load(`${SECRET_PATH}/application-${NAS_PROJECT}.yml`);
const applicationSecret = yamlReader.load(`${SECRET_PATH}/application-secret.yml`);

module.exports = {
  application,
  platform,
  applicationSecret,
};
