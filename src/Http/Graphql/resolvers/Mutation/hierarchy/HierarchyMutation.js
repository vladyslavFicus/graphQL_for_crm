module.exports = {
  /**
   * Create office
   *
   * @param _
   * @param args
   * @param dataSources
   * @param brand
   *
   * @return {Promise<*>}
   */
  async createOffice(_, args, { dataSources, brand }) {
    const { uuid } = await dataSources.HierarchyAPI.getBrand(brand.id);

    await dataSources.HierarchyUpdaterAPI.createBranch({
      ...args,
      branchType: 'OFFICE',
      parentBranch: uuid,
    });

    return true;
  },

  /**
   * Create desk
   *
   * @param _
   * @param officeId
   * @param args
   * @param dataSources
   *
   * @return {Promise<*>}
   */
  async createDesk(_, { officeId, ...args }, { dataSources }) {
    await dataSources.HierarchyUpdaterAPI.createBranch({
      ...args,
      branchType: 'DESK',
      parentBranch: officeId,
    });

    return true;
  },

  /**
   * Create team
   *
   * @param _
   * @param deskId
   * @param args
   * @param dataSources
   *
   * @return {Promise<*>}
   */
  async createTeam(_, { deskId, ...args }, { dataSources }) {
    await dataSources.HierarchyUpdaterAPI.createBranch({
      ...args,
      branchType: 'TEAM',
      parentBranch: deskId,
    });

    return true;
  },
};
