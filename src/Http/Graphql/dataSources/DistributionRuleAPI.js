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
  distributionRuleMigration({ uuid }) {
    return this.post(`/rules/${uuid}/distribution`);
  }
}

module.exports = DistributionRuleAPI;
