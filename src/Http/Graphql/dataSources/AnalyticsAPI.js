const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class AnalyticsAPI extends RESTDataSource {
  /**
   * Track activity events
   *
   * @param args
   *
   * @return {Promise<any>}
   */
  track(args) {
    return this.post('/profile-activity', args);
  }
}

module.exports = AnalyticsAPI;
