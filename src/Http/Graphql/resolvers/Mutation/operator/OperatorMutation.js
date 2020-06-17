const { get } = require('lodash');

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
    await dataSources.HierarchyUpdaterAPI.createUser({
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
   * @return {Promise<{success: boolean}>}
   */
  async changeStatus(_, args, { dataSources }) {
    await dataSources.OperatorAPI.changeStatus(args);

    return { success: true };
  },
};
