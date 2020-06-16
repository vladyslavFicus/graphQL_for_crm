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
   * @param uuid | playerUuid
   *
   * @return {Promise}
   */
  getFeedTypes(uuid) {
    return this.get(`/logs/${uuid}/types`);
  }
}

module.exports = AuditAPI;
