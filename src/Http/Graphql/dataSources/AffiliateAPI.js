const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class AffiliateAPI extends RESTDataSource {
  /**
   * Get partners
   *
   * @param args
   *
   * @return {Promise}
   */
  getPartners(args) {
    return this.post('/affiliates/search', args);
  }

  /**
   * Get partner by uuid
   *
   * @param uuid
   *
   * @return {Promise}
   */
  // TODO: fixed authorities from AUTH
  getPartner(uuid) {
    return this.get(`/affiliates/${uuid}`);
  }

  /**
   * Create partner
   *
   * @param args
   *
   * @return {Promise}
   */
  createPartner(args) {
    return this.post(`/affiliates`, args);
  }

  /**
   * Update partner
   *
   * @param uuid
   * @param args
   *
   * @return {Promise}
   */
  updatePartner({ uuid, ...args }) {
    return this.put(`/affiliates/${uuid}`, args);
  }

  /**
   * Change partner account status
   *
   * @param uuid
   * @param args
   *
   * @return {Promise}
   */
  changePartnerAccountStatus({ uuid, ...args }) {
    return this.put(`/affiliates/${uuid}/status`, args);
  }
}

module.exports = AffiliateAPI;
