module.exports = {
  /**
   * Create brand config
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async create(_, args, { dataSources }) {
    await dataSources.BrandConfigAPI.createBrandConfig(args);

    return true;
  },

  /**
   * Update brand config
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async update(_, args, { dataSources }) {
    await dataSources.BrandConfigAPI.updateBrandConfig(args);

    return true;
  },
};
