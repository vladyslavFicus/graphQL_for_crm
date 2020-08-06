const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class ReferralAPI extends RESTDataSource {
  /**
   * Get refferals by referrer UUID
   *
   * @param uuid Referrer UUID
   *
   * @return {*}
   */
  getReferralsByUUID(uuid) {
    return this.get(`/${uuid}/referrals-history`);
  }
}

module.exports = ReferralAPI;
