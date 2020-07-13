const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class ProfileAPI extends RESTDataSource {
  /**
   * Get refferals by client UUID
   *
   * @param uuid Client UUID
   *
   * @return {*}
   */
  getByUUID(uuid) {
    return this.get(`/admin/referral/${uuid}`);
  }
}

module.exports = ProfileAPI;
