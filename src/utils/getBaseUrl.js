const config = require('config');

/**
 * Get base API url for service
 *
 * @param service
 *
 * @return {string}
 */
module.exports = (service) => {
  // Base service url for local development
  if (__DEV__) {
    return `${config.get('apiUrl')}/${service}`;
  }

  // Base service url for working inside kubernetes
  return `http://${service}.${process.env.NAMESPACE}.svc.cluster.local:9090`;
};
