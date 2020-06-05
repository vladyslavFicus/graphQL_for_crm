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
  create(_, args, { dataSources }) {
    return dataSources.BrandConfigAPI.createBrandConfig(args);
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
  update(_, args, { dataSources }) {
    return dataSources.BrandConfigAPI.updateBrandConfig(args);
  },

  /**
   * Delete brand config
   *
   * @param _
   * @param brandId
   * @param dataSources
   *
   * @return {Promise}
   */
  delete(_, { brandId }, { dataSources }) {
    return dataSources.BrandConfigAPI.deleteBrandConfig(brandId);
  },
};
