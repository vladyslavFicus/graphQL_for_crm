const DataLoader = require('dataloader');
const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');
const orderByArray = require('../../../utils/orderByArray');

class ProfileViewAPI extends RESTDataSource {
  constructor(args) {
    super(args);

    this.loaderPersonalInfo = new DataLoader(this._loaderPersonalInfo.bind(this));
  }

  async _loaderPersonalInfo(uuids) {
    const data = await this.post('/admin/profiles/personal-information', { uuids });

    return orderByArray(uuids, data, 'uuid');
  }

  /**
   * Get profile view by uuid
   *
   * @param uuid Client UUID
   *
   * @return {*}
   */
  getByUUID(uuid) {
    return this.get(`/admin/profiles/${uuid}`);
  }

  /**
   * Get client personal info by uuid
   *
   * @param uuid Client UUID
   *
   * @return {Promise}
   */
  getPersonalInfoByUUID(uuid) {
    return uuid && this.loaderPersonalInfo.load(uuid);
  }

  /**
   * Search clients
   *
   * @param args
   *
   * @return {*}
   */
  search(args) {
    return this.post('/admin/profiles/pageable-search', args);
  }
}

module.exports = ProfileViewAPI;
