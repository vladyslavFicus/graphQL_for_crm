const yaml = require('yamljs');
const { get } = require('lodash');
const { services: customServices } = require('../../../constants/services');
const parseJson = require('../../../utils/parseJson');
const Logger = require('../../../utils/logger');

const { NAS_PROJECT } = process.env;
const portainerServicesFilter = JSON.stringify({ name: [`${NAS_PROJECT}_env`] });

let cachedServices;
let cachedTimestamp;

const getServices = async function() {
  try {
    let services = [];

    const responseObject = await fetch(
      `${global.appConfig.portainerUrl}/api/endpoints/1/docker/configs?filters=${portainerServicesFilter}`,
      {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
      }
    );

    if (!responseObject.ok) {
      return [];
    }

    const responseText = await responseObject.text();
    const encodedString = get(parseJson(responseText, []), '0.Spec.Data');
    const servicesConfig = encodedString ? Buffer.from(encodedString, 'base64').toString('utf-8') : null;

    if (servicesConfig) {
      services = get(yaml.parse(servicesConfig), 'depends', []).map(item => {
        const [, name] = item.match(/^hrzn\/(\w+)-v/);

        return name;
      });
    }

    if (get(global, 'appConfig.secrets.dwh_api', false)) {
      services.push(customServices.dwh);
    }

    return services;
  } catch (error) {
    Logger.error({ message: error.stack || error.message, error });

    return [];
  }
};

const getServicesResolver = async () => {
  const timestamp = Date.now() / 1000;

  if (!cachedServices || (cachedTimestamp && timestamp - cachedTimestamp > 30)) {
    cachedServices = await getServices();
    cachedTimestamp = Date.now() / 1000;
  }

  return cachedServices;
};

module.exports = {
  getServices: getServicesResolver,
};
