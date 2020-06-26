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
   * Create branch in hierarchy
   * [office, desk, team]
   *
   * @param args
   * @param args.branchType
   * @param args.country
   * @param args.deskType
   * @param args.language
   * @param args.name
   * @param args.parentBranch
   *
   * @return {Promise}
   */
  createBranch(args) {
    return this.post('/branch', args);
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

  /**
   *
   * Move client to another operator (Sales <-> Retention)
   *
   * @param args
   *
   * @return {Promise}
   */
  bulkUpdateHierarchyUser(args) {
    return this.put('/bulk/user/relationship/parent-user', args);
  }
}

module.exports = HierarchyUpdaterAPI;
