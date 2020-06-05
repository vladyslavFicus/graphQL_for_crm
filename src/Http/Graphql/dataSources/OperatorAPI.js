const DataLoader = require('dataloader');
const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');
const orderByArray = require('../../../utils/orderByArray');

class OperatorAPI extends RESTDataSource {
  constructor(args) {
    super(args);

    this.loader = new DataLoader(this._loader.bind(this));
  }

  async _loader(uuids) {
    const data = await this.post('/operators/search', { uuids });

    return orderByArray(uuids, data.content, 'uuid');
  }

  /**
   * Get operator by UUID
   *
   * @param uuid Operator UUID
   *
   * @return {Promise}
   */
  getByUUID(uuid) {
    return this.loader.load(uuid);
  }
}

module.exports = OperatorAPI;
