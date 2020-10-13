const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class DistributionRuleAPI extends RESTDataSource {
  /**
   * Search rules
   *
   * @param args
   *
   * @return {*}
   */
  search(args) {
    return this.get('/rules', args);
  }

  /**
   * Start migration
   *
   * @param uuid
   *
   * @return {*}
   */
  migration(uuid) {
    return this.post(`/rules/${uuid}/distribution`);
  }

  /**
   * Create rule
   *
   * @param args
   *
   * @return {*}
   */
  create(args) {
    return this.post('/rules', args);
  }

  /**
   * Update rule
   *
   * @param uuid
   * @param args
   *
   * @return {*}
   */
  update(uuid, args) {
    return this.patch(`/rules/${uuid}`, args);
  }

  /**
   * Get clients amount
   *
   * @param uuid
   *
   * @return {*}
   */
  getClientsAmount(uuid) {
    return this.get(`/rules/${uuid}/clients`);
  }
}

module.exports = DistributionRuleAPI;
