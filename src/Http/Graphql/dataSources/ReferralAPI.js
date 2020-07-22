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
}

module.exports = ReferralAPI;
