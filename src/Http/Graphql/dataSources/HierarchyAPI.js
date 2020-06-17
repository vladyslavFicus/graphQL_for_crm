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
    return uuid && this.loader.load(uuid);
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
   *
   * Get observer for ids from hierarchy tree
   *
   * @param uuid | current operator uuid
   *
   * @return {Promise}
   */
  getObserverForSubtree(uuid) {
    return this.get(`/user/${uuid}/observer-for`);
  }

  /**
   * Check operator permission to access the entity
   * Note: Allow or disallow operator to see entity (leads, operators, clients, partners) regarding him hierarchy tree
   *
   * @param uuid
   * @return {Promise}
   */
  checkAccess(uuid) {
    return this.get(`/user/${uuid}/check-access`);
  }
}

module.exports = HierarchyAPI;
