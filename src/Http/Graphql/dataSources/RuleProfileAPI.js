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
}

module.exports = RuleProfileAPI;
