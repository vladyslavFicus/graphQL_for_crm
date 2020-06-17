const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class HierarchyUpdaterAPI extends RESTDataSource {
  /**
   * Create user in hierarchy
   *
   * @param args
   * @param args.uuid
   * @param args.userType
   * @param args.parentBranch
   *
   * @return {Promise}
   */
  createUser(args) {
    return this.post('/user', args);
  }

  /**
   * Update user branches
   *
   * @param uuid
   * @param args
   * @param args.assignToBranch
   * @param args.unassignFromBranch
   *
   * @return {*}
   */
  updateUserBranches(uuid, args) {
    return this.put(`/user/${uuid}/relationship/parent-branch`, args);
  }

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
