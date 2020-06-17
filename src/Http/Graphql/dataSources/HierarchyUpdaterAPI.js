const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class HierarchyUpdaterAPI extends RESTDataSource {
  /**
   *
   * Mass assign lead or client to another operator
   *
   * @param args
   *
   * @return {Promise}
   */
  bulkMassAssignHierarchyUser(args) {
    return this.put('/bulk/user/multi-assignment', args);
  }
}

module.exports = HierarchyUpdaterAPI;
