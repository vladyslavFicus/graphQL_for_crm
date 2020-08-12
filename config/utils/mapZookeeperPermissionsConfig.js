const config = require('config');
const { set } = require('lodash');

/**
 * Constructing an object like this for fast searching:
 * {
 *   "nasfx.SALES.EXECUTIVE": {
 *     "profile.canView": true,
 *     "payment.search": true,
 *     "payment.edit": true,
 *   },
 *   "cryptomb.SALES.EXECUTIVE": {
 *     "profile.canView": true,
 *     "payment.search": true,
 *     "payment.edit": false,
 *   },
 * }
 *
 * @param permissions
 */
module.exports = (permissions) => {
  const _permissions = {};

  // Get authorities of each brand
  Object.values(permissions).forEach((authorities) => {
    // Get each authority for current brand
    authorities.forEach((authority) => {
      // Get all actions for current authority
      authority.actions.forEach((action) => {
        // Set only "backoffice-graphql" permissions to memory
        if (action.startsWith(config.name)) {
          set(_permissions, [`${authority.brandId}.${authority.department}.${authority.role}`, action], true);
        }
      });
    });
  });

  return { permissions: _permissions };
};
