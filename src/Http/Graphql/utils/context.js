const { v4 } = require('uuid');
const config = require('config');
const jwtDecode = require('jwt-decode');
const { createDataloaders } = require('../../../graphql/dataloaders');
const Hierarchy = require('../../../services/Hierarchy');

/**
 * Provide context for apollo server
 *
 * @param headers
 * @param ip
 * @param body
 *
 * @return {{requestId: *, brandId: *, headers: *, ip: *}}
 */
module.exports = async ({ req: { headers, ip } }) => {
  const context = {
    requestId: v4(),
    headers,
    ip,
  };

  if (headers && headers.authorization && headers.authorization !== 'undefined') {
    const { brandId, uuid: userUUID } = jwtDecode(headers.authorization);

    // Return context if token without brandId field
    if (!brandId) {
      return context;
    }

    const brand = config.get('brands')[brandId];

    // Throw an error if brand wasn't found
    if (!brand) {
      throw new Error('Brand not found in brand configuration');
    }

    Object.assign(context, {
      userUUID,
      brand,
      hierarchy: new Hierarchy(userUUID, headers.authorization),
      dataloaders: createDataloaders(headers.authorization, brandId),
    });
  }

  return context;
};
