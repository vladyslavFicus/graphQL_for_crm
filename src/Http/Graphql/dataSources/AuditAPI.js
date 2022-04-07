const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class AuditAPI extends RESTDataSource {
  /**
   * Get feeds
   *
   * @param args
   *
   * @return {Promise}
   */
  getFeeds(args) {
    return this.post('/logs/search', args);
  }

  /**
   * Get feed types
   *
   * @param uuid Client UUID or Operator UUID or Partner UUID
   *
   * @return {Promise}
   */
  getFeedTypes(uuid, filters) {
    return this.post(`/logs/${uuid}/types`, { ...filters });
  }
}

module.exports = AuditAPI;
