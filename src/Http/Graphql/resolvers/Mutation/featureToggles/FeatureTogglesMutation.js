module.exports = {
  /**
   * Update feature toggles
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async updateFeatureToggles(_, args, { dataSources }) {
    await dataSources.BrandConfigAPI.updateFeatureToggles(args);
  },
};
