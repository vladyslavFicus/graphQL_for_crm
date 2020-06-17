const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class ProfileAPI extends RESTDataSource {
  /**
   * Get profile by uuid
   *
   * @param uuid Client UUID
   *
   * @return {*}
   */
  getByUUID(uuid) {
    return this.get(`/admin/profiles/${uuid}`);
  }

  /**
   * Create profile
   *
   * @param args
   *
   * @return {*}
   */
  createProfile(args) {
    return this.post('/admin/profiles', args);
  }
}

module.exports = ProfileAPI;
