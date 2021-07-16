const DataLoader = require('dataloader');
const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');
const orderByArray = require('../../../utils/orderByArray');

class HierarchyAPI extends RESTDataSource {
  constructor(args) {
    super(args);

    this.loader = new DataLoader(this._loader.bind(this));
    this.acquisitionLoader = new DataLoader(this._acquisitionLoader.bind(this));
  }

  async _loader(userUuids) {
    const brandId = this.context.brand.id;

    const data = await this.post('/user/search', {
      userUuids,
      branchFilter: {
        brandId,
      },
    });

    return orderByArray(userUuids, data, 'uuid');
  }

  async _acquisitionLoader(userUuids) {
    const data = await this.post('/user/acquisitions/search', { userUuids });

    return orderByArray(userUuids, data, 'userUuid');
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
   * Get user acquisition by UUID
   *
   * @param uuid OperatorUUID
   *
   * @return {Promise}
   */
  async getUserAcquisition(uuid) {
    if (uuid) {
      const response = await this.acquisitionLoader.load(uuid);

      return response && response.acquisition;
    }

    return null;
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
   * @param brandId Brand ID
   *
   * @return {Promise}
   */
  getBrand(brandId) {
    return this.get('/branch/brand', { brandId });
  }

  /**
   *
   * Get user branches
   *
   * @param uuid
   * @param args
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
   * Get branch info
   *
   * @param uuid | branchId
   *
   * @return {Promise}
   */
  getBranchInfo(uuid) {
    return this.get(`/branch/${uuid}`);
  }

  /**
   * Get branch children
   *
   * @param uuid | branchId
   *
   * @return {Promise}
   */
  getBranchChildren(uuid) {
    return this.get(`/branch/${uuid}/children`);
  }

  /**
   * Get branch users
   *
   * @param uuid | branchId
   *
   * @return {Promise}
   */
  getBranchUsers(uuid) {
    return this.get(`/branch/${uuid}/users`);
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

  getUserBranchesTreeUp(userUUID) {
    return this.get(`/user/${userUUID}/branches/hierarchy-up`);
  }

  /**
   * Get hierarchy tree top level for authenticated user
   *
   * @return {*}
   */
  getTreeTop() {
    return this.get('/tree/top');
  }

  /**
   * Get single level of hierarchy by branch uuid
   *
   * @param uuid Branch UUID
   *
   * @return {*}
   */
  getTreeBranch(uuid) {
    return this.get(`/tree/${uuid}`);
  }
}

module.exports = HierarchyAPI;
