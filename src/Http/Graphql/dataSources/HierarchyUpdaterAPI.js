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
   * Update user type
   *
   * @param uuid
   * @param args
   * @param args.userType
   *
   * @return {*}
   */
  updateUserType(uuid, args) {
    return this.put(`/user/${uuid}`, args);
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

  /**
   *
   * Add branch manager
   *
   * @param branchUuid
   * @param args
   *
   * @return {Promise}
   */
  addBranchManager(branchUuid, args) {
    return this.post(`/branch/${branchUuid}/manager`, args);
  }

  /**
   *
   * Remove branch manager
   *
   * @param branchUuid
   *
   * @return {Promise}
   */
  removeBranchManager(branchUuid) {
    return this.delete(`/branch/${branchUuid}/manager`);
  }
}

module.exports = HierarchyUpdaterAPI;