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
  async getPartners(args) {
    return this.post('/affiliates/search', args);
  }

  /**
   * Get all CDE partners
   *
   * @return {Promise}
   */
  getCdePartners() {
    return this.get('/affiliates/all/cde');
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
   * Get schedule by affiliateUuid
   *
   * @param affiliateUuid
   *
   * @return {Promise}
   */
  getSchedule(affiliateUuid) {
    return this.get(`/affiliates/traffic/${affiliateUuid}/week`);
  }

  /**
   * Create schedule
   *
   * @param args
   * @param affiliateUuid
   *
   * @return {Promise<{success: boolean}>}
   */
  createSchedule({ affiliateUuid, ...args }) {
    return this.post(`/affiliates/traffic/${affiliateUuid}/day`, args);
  }

  /**
   * Change schedule status
   *
   * @param affiliateUuid
   * @param data
   *
   * @return {Promise<{success: boolean}>}
   */
  changeScheduleStatus({ affiliateUuid, data }) {
    return this.put(`/affiliates/traffic/${affiliateUuid}/activity`, data);
  }

  /**
   * Create partner
   *
   * @param args
   *
   * @return {Promise}
   */
  createPartner(args) {
    return this.post('/affiliates', args);
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
