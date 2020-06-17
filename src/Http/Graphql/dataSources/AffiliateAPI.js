const DataLoader = require('dataloader');
const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');
const orderByArray = require('../../../utils/orderByArray');

class AffiliateAPI extends RESTDataSource {
  constructor(args) {
    super(args);

    this.loader = new DataLoader(this._loader.bind(this));
  }

  async _loader(uuids) {
    const data = await this.post('/affiliates/search', { uuids });

    return orderByArray(uuids, data.content, 'uuid');
  }

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
  getPartner(uuid) {
    return uuid && this.loader.load(uuid);
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
