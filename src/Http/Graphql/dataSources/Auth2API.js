const DataLoader = require('dataloader');
const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');
const orderByArray = require('../../../utils/orderByArray');

class Auth2API extends RESTDataSource {
  constructor(args) {
    super(args);

    this.authoritiesLoader = new DataLoader(this._authoritiesLoader.bind(this));
  }

  async _authoritiesLoader(filters) {
    const uuids = filters.map(({ uuid }) => uuid);
    const { brand } = filters[0];

    const data = await this.post('/users/authorities', { uuids, brand });

    return orderByArray(uuids, data, 'uuid');
  }

  /**
   * Sign in operator
   *
   * @param args
   *
   * @return {Promise}
   */
  signIn(args) {
    return this.post('/operator/signin', args);
  }

  /**
   * Choose department after sign in
   *
   * @param args
   *
   * @return {Promise}
   */
  chooseDepartment(args) {
    return this.post('/operator/department', args);
  }

  /**
   * Logout
   *
   * @return {Promise}
   */
  logout() {
    return this.post('/logout');
  }

  /**
   * Token renew
   *
   * @return {Promise}
   */
  tokenRenew() {
    return this.post('/token/renew');
  }

  /**
   * Get permissions list
   *
   * @return {Promise}
   */
  getPermissions() {
    return this.get('/users/actions');
  }

  /**
   * Change client/player password
   *
   * @param uuid
   * @param args
   *
   * @return {Promise}
   */
  changeClientPassword(uuid, args) {
    return this.put(`/password/player/${uuid}`, args);
  }

  /**
   * Change operator password
   *
   * @param uuid
   * @param args
   *
   * @return {Promise}
   */
  changeOperatorPassword(uuid, args) {
    return this.put(`/password/operator/${uuid}`, args);
  }

  /**
   * Change operator password
   *
   * @param uuid
   * @param args
   *
   * @return {Promise}
   */
  changeUnauthorizedPassword(uuid, args) {
    return this.post(`/password/${uuid}/unauthorized`, args);
  }

  /**
   * Reset user (client or operator) password
   *
   * @param uuid
   *
   * @return {Promise}
   */
  resetUserPassword(uuid) {
    return this.post(`/password/user/${uuid}/reset`);
  }

  /**
   * Reset yourself password
   *
   * @param args
   *
   * @return {Promise}
   */
  resetPassword(args) {
    return this.put('/password/token', args);
  }

  /**
   * Get credentials lock
   *
   * This is an endpoint that returns user's lock status
   * The lock status becomes true after user typed wrong password 5 times on sign in
   *
   * @param uuid
   *
   * @return {Promise}
   */
  getCredentialsLock(uuid) {
    return this.get(`/lock/${uuid}`);
  }

  /**
   * Unlock user ability to sign in
   *
   * @param uuid
   *
   * @return {Promise}
   */
  unlockUser(uuid) {
    return this.delete(`/lock/${uuid}`);
  }

  /**
   * Get all authorities
   *
   * @param brand
   *
   * @return {Promise}
   */
  getAuthorities(brand) {
    return this.get('/authorities', { brand });
  }

  /**
   * Get user authorities
   *
   * @param uuid
   * @param brand
   *
   * @return {Promise}
   */
  async getAuthoritiesByUuid(uuid, brand) {
    if (uuid) {
      const response = await this.authoritiesLoader.load({ uuid, brand });

      return (response && response.authorities) || [];
    }

    return [];
  }

  /**
   * Add authority
   *
   * @param uuid
   * @param args
   *
   * @return {Promise}
   */
  addAuthority(uuid, args) {
    return this.post(`/users/${uuid}/authorities`, args);
  }

  /**
   * Remove authority
   *
   * @param uuid
   * @param args
   *
   * @return {Promise}
   */
  removeAuthority(uuid, args) {
    return this.delete(`/users/${uuid}/authorities`, args);
  }

  /**
   * Get actions for brand, department and role
   *
   * @param brand
   * @param department
   * @param role
   *
   * @return {*}
   */
  getActions(brand, department, role) {
    return this.get(`/authorities/${brand}/${department}/${role}/actions`);
  }

  /**
   * Update authority actions
   *
   * @param brand
   * @param department
   * @param role
   * @param actions
   * @param isPermitted
   *
   * @return {*}
   */
  updateAuthorityActions(brand, department, role, actions, isPermitted) {
    return this.patch(`/authorities/${brand}/${department}/${role}/actions`, { actions, isPermitted });
  }

  /**
   * Reset permission to default
   *
   * @param brand
   * @param department
   * @param role
   *
   * @return {Promise}
   */
  resetPermission(brand, department, role,) {
    return this.post(`/authorities/brands/${brand}/${department}/${role}/reset-permissions`);
  }

  /**
   * Get all actions
   *
   * @return {*}
   */
  getAllActions() {
    return this.get('/actions');
  }
}

module.exports = Auth2API;
