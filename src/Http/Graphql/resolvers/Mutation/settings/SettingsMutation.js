module.exports = {
  /**
   * Create acquisition status
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async createAcquisitionStatus(_, args, { dataSources, brand }) {
    await dataSources.HierarchyUpdaterAPI.createBrandAcquisitionStatus(brand.id, args);
  },

  /**
   * Delete acquisition status
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async deleteAcquisitionStatus(_, args, { dataSources, brand }) {
    await dataSources.HierarchyUpdaterAPI.deleteBrandAcquisitionStatus(brand.id, args);
  },

  /**
   * Create payment systems provider
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  createPaymentSystemsProvider(_, args, { dataSources }) {
    dataSources.PaymentAPI.createPaymentSystemsProvider(args);
    return true;
  },

  /**
   * Delete payment systems provider
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  deletePaymentSystemsProvider(_, args, { dataSources }) {
    dataSources.PaymentAPI.deletePaymentSystemsProvider(args);
    return true;
  },
};
