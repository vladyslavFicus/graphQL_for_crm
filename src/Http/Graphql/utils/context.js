const { v4 } = require('uuid');
const config = require('config');
const jwtDecode = require('jwt-decode');
const Auth = require('../../../lib/Auth');

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
    const { brandId, uuid: userUUID, department, role } = jwtDecode(headers.authorization);

    // Return context if token without brandId field
    if (!brandId) {
      return context;
    }

    const brand = config.get('brands').find(({ id }) => brandId === id);
    const brandConfig = config.get('brandsConfig')[brandId];

    // Throw an error if brand wasn't found
    if (!brand) {
      throw new Error('Brand not found in brand configuration');
    }

    Object.assign(context, {
      userUUID,
      brand,
      brandConfig,
      auth: new Auth(brandId, department, role),
    });
  }

  return context;
};
