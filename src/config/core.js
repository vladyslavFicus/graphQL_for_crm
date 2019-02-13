const yamlReader = require('yamljs');

const { NAS_PROJECT, NAS_SERVICE } = process.env;
const SECRET_PATH = process.env.SECRET_PATH || `/${NAS_SERVICE}/lib/etc`;

const platform = yamlReader.load(`${SECRET_PATH}/application-${NAS_PROJECT}.yml`);

module.exports = {
  platform,
};
