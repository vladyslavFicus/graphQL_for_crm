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
   * Get clients amount
   *
   * @param uuid
   *
   * @return {*}
   */
  getClientsAmount(uuid) {
    return this.get(`/rules/${uuid}/clients`);
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
   * Update rule
   *
   * @param uuid
   * @param args
   *
   * @return {*}
   */
  updateRule(uuid, args) {
    return this.put(`/rules/${uuid}`, args);
  }
}

module.exports = DistributionRuleAPI;
