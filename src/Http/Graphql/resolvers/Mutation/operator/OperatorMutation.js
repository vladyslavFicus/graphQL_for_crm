module.exports = {
  /**
   * Create operator
   *
   * @param _
   * @param branchId
   * @param userType
   * @param args
   * @param dataSources
   * @param brand
   *
   * @return {Promise<void>}
   */
  async createOperator(_, { branchId, userType, ...args }, { dataSources, brand }) {
    const operator = await dataSources.OperatorAPI.create({
      brandId: brand.id,
      ...args,
    });

    // Add operator to hierarchy
    await dataSources.HierarchyUpdaterAPI.operatorCreateOrAssign({
      uuid: operator.uuid,
      userType,
      parentBranch: branchId,
    });

    return operator;
  },

  /**
   * Update operator
   *
   * @param _
   * @param uuid
   * @param args
   * @param dataSources
   *
   * @return {Promise<void>}
   */
  updateOperator(_, { uuid, ...args }, { dataSources }) {
    return dataSources.OperatorAPI.update(uuid, args);
  },

  /**
   * Add existing operator
   *
   * @param _
   * @param email
   * @param department
   * @param role
   * @param branchId
   * @param dataSources
   * @param brand
   *
   * @return {Promise<void>}
   */
  async addExistingOperator(_, { email, department, role, branchId }, { dataSources, brand }) {
    const {
      content: [operator],
    } = await dataSources.OperatorAPI.search({ searchBy: email });

    // Add authority to operator
    await dataSources.Auth2API.addAuthority(operator.uuid, { brand: brand.id, department, role });

    // Add operator to branch in hierarchy
    await dataSources.HierarchyUpdaterAPI.updateUserBranches(operator.uuid, { assignToBranch: branchId });

    return operator;
  },

  /**
   * Change operator status
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async changeStatus(_, args, { dataSources }) {
    await dataSources.OperatorAPI.changeStatus(args);
  },

  /**
   * Add operator to branch
   *
   * @param _
   * @param operatorId
   * @param branchId
   * @param dataSources
   *
   * @return {Promise}
   */
  async addOperatorToBranch(_, { operatorId, branchId }, { dataSources }) {
    await dataSources.HierarchyUpdaterAPI.updateUserBranches(operatorId, { assignToBranch: branchId });

    return true;
  },

  /**
   * Remove operator from branch
   *
   * @param _
   * @param operatorId
   * @param branchId
   * @param dataSources
   *
   * @return {Promise}
   */
  async removeOperatorFromBranch(_, { operatorId, branchId }, { dataSources }) {
    await dataSources.HierarchyUpdaterAPI.updateUserBranches(operatorId, { unassignFromBranch: branchId });

    return true;
  },

  /**
   * Update operator user type
   *
   * @param _
   * @param operatorId
   * @param branchId
   * @param dataSources
   *
   * @return {Promise
   */
  async updateOperatorUserType(_, { operatorId, ...args }, { dataSources }) {
    await dataSources.HierarchyUpdaterAPI.updateUserType(operatorId, args);

    return true;
  },
};
