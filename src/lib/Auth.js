const config = require('config');
const { get } = require('lodash');

class Auth {
  /**
   * Create new Auth instance
   *
   * @param brandId Brand from jwt token
   * @param department Department from jwt token
   * @param role Role from jwt token
   */
  constructor(brandId, department, role) {
    this._brandId = brandId;
    this._department = department;
    this._role = role;
  }

  /**
   * Determine if the given action should be granted for the current user.
   *
   * @param action Action to check allowing
   */
  allows(action) {
    return get(
      config.permissions,
      [
        `${this._brandId}.${this._department}.${this._role}`,
        `${config.name}.${action}`,
      ],
      false,
    );
  }

  /**
   * Determine if the given action should be denied for the current user.
   *
   * @param action Action to check denying
   */
  denies(action) {
    return !this.allows(action);
  }
}

module.exports = Auth;
