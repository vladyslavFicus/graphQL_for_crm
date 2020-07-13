const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class ProfileAPI extends RESTDataSource {
  /**
   * Get refferals by referrer UUID
   *
   * @param uuid Referrer UUID
   *
   * @return {*}
   */
  getByUUID(uuid) {
    return this.get(`/${uuid}/referral-history`);
  }
}

module.exports = ProfileAPI;
