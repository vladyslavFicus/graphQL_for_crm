const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class RuleProfileAPI extends RESTDataSource {
  /**
   * Search rules
   *
   * @param args
   *
   * @return {*}
   */
  search(args) {
    return this.post('/search', args);
  }

  /**
   * Create sales rule
   *
   * @param args
   *
   * @return {*}
   */
  createRule(args) {
    return this.post('/', args);
  }

  /**
   * Delete sales rule
   *
   * @param uuid
   *
   * @return {*}
   */
  deleteRule(uuid) {
    return this.delete(`/${uuid}`);
  }
}

module.exports = RuleProfileAPI;
