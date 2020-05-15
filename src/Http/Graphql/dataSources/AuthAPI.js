const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class AuthAPI extends RESTDataSource {
  /**
   * Get authorities by operator UUID
   *
   * @param uuid
   *
   * @return {Promise}
   */
  getAuthorities(uuid) {
    return this.get(`/auth/credentials/${uuid}/authorities`);
  }
}

module.exports = AuthAPI;
