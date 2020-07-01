const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class BrandConfigAPI extends RESTDataSource {
  /**
   * Get brand config
   *
   * @param brandId
   *
   * @return {Promise}
   */
  getBrandConfig(brandId) {
    return this.get(`/brand/${brandId}`);
  }

  /**
   * Create brand config
   *
   * @param args
   *
   * @return {Promise}
   */
  createBrandConfig(args) {
    return this.post('/brand', args);
  }

  /**
   * Update brand config
   *
   * @param args
   *
   * @return {Promise}
   */
  updateBrandConfig(args) {
    return this.put('/brand', args);
  }
}

module.exports = BrandConfigAPI;
