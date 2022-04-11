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
    // Object spread { ...args } is required here while https://github.com/apollographql/apollo-server/issues/1539
    return this.post(`/logs/${uuid}/types`, { ...filters });
  }
}

module.exports = AuditAPI;
