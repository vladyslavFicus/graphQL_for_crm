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
   * Get client personal info by uuid
   *
   * @param uuid Client UUID
   *
   * @return {Promise}
   */
  getPersonalInfoByUUID(uuid) {
    return this.loaderPersonalInfo.load(uuid);
  }
}

module.exports = ProfileViewAPI;
