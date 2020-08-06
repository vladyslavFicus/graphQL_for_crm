const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class ReferralAPI extends RESTDataSource {
  /**
   * Get Referrer statistics
   *
   * @param uuid Client UUID
   *
   * @return {*}
   */
  getReferrerStatistics(uuid) {
    return this.get(`/${uuid}/statistics`);
  }

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
