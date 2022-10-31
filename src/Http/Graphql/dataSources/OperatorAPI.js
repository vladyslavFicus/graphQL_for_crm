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
    return uuid && this.loader.load(uuid);
  }

  /**
   * Get operators by UUIDs
   *
   * @param uuids array of operator UUIDs
   *
   * @return {Promise}
   */
  getByUUIDs(uuids) {
    return uuids && this.loader.loadMany(uuids);
  }

  /**
   * Search operators
   *
   * @param args
   * @param args.uuids
   * @param args.limit
   * @param args.page
   * @param args.country
   * @param args.phone
   * @param args.registrationDateFrom
   * @param args.registrationDateTo
   * @param args.searchBy
   * @param args.status
   * @param args.authorities
   * @param args.offices
   * @param args.desks
   * @param args.teams
   *
   * @return {*}
   */
  search(args) {
    return this.post('/operators/search', args);
  }

  /**
   * Get hierarchically subordinate operators by brand and hierarchy type group (SALES, RETENTION)
   *
   * @param uuid
   * @param args
   * @param args.brandId
   * @param args.hierarchyTypeGroup
   *
   * @return {*}
   */
  searchByBrand(uuid, args) {
    return this.post(`/operators/${uuid}/subordinates`, args);
  }

  /**
   * Create operator
   *
   * @param args
   * @param args.firstName
   * @param args.lastName
   * @param args.email
   * @param args.country
   * @param args.phone
   * @param args.sip
   * @param args.brandId
   * @param args.operatorRole
   * @param args.type
   * @param args.password
   * @param args.department
   * @param args.role
   * @param args.userType
   * @param args.parentBranch
   * @param createHierarchy
   *
   * @return {*}
   */
  create(args) {
    return this.post('/operators', args, { params: { createHierarchy: true } });
  }

  /**
   * Update operator
   *
   * @param uuid
   * @param args
   * @param args.firstName
   * @param args.lastName
   * @param args.country
   * @param args.phoneNumber
   * @param args.sip
   *
   * @return {*}
   */
  update(uuid, args) {
    return this.put(`/operators/${uuid}`, args);
  }

  /**
   * Change operator status
   *
   * @param args
   * @param args.uuid
   * @param args.reason
   * @param args.status
   *
   * @return {*}
   */
  changeStatus(args) {
    return this.put('/operators/status', args);
  }

  /**
   * Update operator user type
   *
   * @param uuid
   * @param args
   * @param args.userType
   *
   * @return {*}
   */
  updateUserType(uuid, args) {
    return this.put(`/operators/${uuid}/user-type`, args);
  }

  /**
   * Get operator external relations count
   *
   * @param uuid
   * @param args
   *
   * @return {*}
   */
  getSubordinateOperators({ userUUID, ...args }) {
    return this.post(`/operators/${userUUID}/subordinates`, args);
  }

  /**
   * Get operator external relations count
   *
   * @param uuid
   *
   * @return {*}
   */
  getRelationsCount(uuid) {
    return this.get(`/operators/${uuid}/external-relations-count`);
  }
}

module.exports = OperatorAPI;
