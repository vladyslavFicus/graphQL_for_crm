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
   * Update rule name and order
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
    return this.get(`/rules/${uuid}/matched-clients/count`);
  }

  /**
   * Get rule by uuid
   *
   * @param uuid
   *
   * @return {*}
   */
  getRule(uuid) {
    return this.get(`/rules/${uuid}`);
  }

  /**
   * Update rule settings
   *
   * @param uuid
   * @param args
   *
   * @return {*}
   */
  updateRule(uuid, args) {
    return this.put(`/rules/${uuid}`, args);
  }

  /**
   * Get available number of clients
   *
   * @param args
   *
   * @return {*}
   */
  getRuleClientsAmount(args) {
    return this.post('/clients/count', args);
  }

  /**
   * Update rule status
   *
   * @param uuid
   * @param args
   *
   * @return {*}
   */
  updateRuleStatus(uuid, args) {
    return this.put(`/rules/${uuid}/status`, args);
  }
}

module.exports = DistributionRuleAPI;
