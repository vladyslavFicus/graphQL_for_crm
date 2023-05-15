const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class S3API extends RESTDataSource {
  /**
   * Disable our custom headers for S3 requests
   */
  willSendRequest() {
    // Do nothing to skip any headers applies...
  }

  /**
   * Get available brands for crm brand
   *
   * @return {Promise}
   */
  getAvailableBrandsForCrmBrand(crmBrand) {
    return this.get(`/crm-brands/${crmBrand}/brands.json`, null, { cacheOptions: { ttl: 1 } });
  }
}

module.exports = S3API;
