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
   * Get user hierarchy
   *
   * @param uuid Current userUuid || OperatorUuid
   *
   * @return {Promise}
   */
  getUserHierarchy(uuid) {
    return this.get(`/user/${uuid}`);
  }

  /**
   * Get brand info
   *
   * @param uuid OperatorUUID
   *
   * @return {Promise}
   */
  getBrand(brandId) {
    return this.get('/branch/brand', { brandId });
  }

  /**
   *
   * Get user branhces
   *
   * @param uuid
   * @param args.brandId
   *
   * @return {Promise}
   *
   */
  getUserBranches(uuid, args) {
    return this.get(`/branch/hierarchy/user/${uuid}`, args);
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
   *
   * @return {Promise}
   */
  checkAccess(uuid) {
    return this.get(`/user/${uuid}/check-access`);
  }

  /**
   * Get office
   *
   * @param uuid | userUuid
   * @param args
   *
   * @return {Promise}
   */
  getOffice(uuid, args) {
    return this.post(`/branch/hierarchy/user/${uuid}/office`, args);
  }

  /**
   * Get team
   *
   * @param uuid | userUuid
   * @param args
   *
   * @return {Promise}
   */
  getTeam(uuid, args) {
    return this.post(`/branch/hierarchy/user/${uuid}/team`, args);
  }

  /**
   * Get desk
   *
   * @param uuid | userUuid
   * @param args
   *
   * @return {Promise}
   */
  getDesk(uuid, args) {
    return this.post(`/branch/hierarchy/user/${uuid}/desk`, args);
  }

  /**
   * Get branch hierarchy tree
   * Note: Get tree of branches. Branch with the given uuid will be in root.
   *
   * @param uuid
   *
   * @return {Promise}
   */
  getBranchTree(uuid) {
    return this.get(`/branch/hierarchy/${uuid}`);
  }

  /**
   * Get users by branch
   *
   * @param args
   *
   * @return {Promise}
   */
  getUsersByBranch(args) {
    return this.post('/user/search/hierarchy', args);
  }
}

module.exports = HierarchyAPI;
