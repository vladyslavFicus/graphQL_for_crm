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
}

module.exports = ProfileAPI;
