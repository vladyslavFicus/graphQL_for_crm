const DataLoader = require('dataloader');
const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');
const orderByArray = require('../../../utils/orderByArray');

class HierarchyAPI extends RESTDataSource {
  constructor(args) {
    super(args);

    this.loader = new DataLoader(this._loader.bind(this));
  }

  async _loader(userUuids) {
    const data = await this.post('/user/search', { userUuids });

    return orderByArray(userUuids, data, 'uuid');
  }

  /**
   * Get hierarchy user by UUID
   *
   * @param uuid OperatorUUID
   *
   * @return {Promise}
   */
  getUser(uuid) {
    return this.loader.load(uuid);
  }

  /**
   * Get operators subtree for current operator UUID
   *
   * @param uuid
   *
   * @return {*}
   */
  getOperatorsSubtree(uuid) {
    return this.get(`/user/${uuid}/operators`);
  }

  /**
   * Check access by hierarchy to operator profile by UUID
   *
   * @param uuid
   *
   * @return {*}
   */
  checkAccess(uuid) {
    return this.get(`/user/${uuid}/check-access`);
  }
}

module.exports = HierarchyAPI;
