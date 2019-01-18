const { getCustomersSubtree, getLeadsSubtree, getOperatorsSubtree } = require('../utils/hierarchyRequests');
const Logger = require('../utils/logger');

class Hierarchy {
  constructor(userUUID, authorization) {
    this._userUUID = userUUID;
    this._authorization = authorization;

    this._customersPromise = null;
    this._operatorsPromise = null;
    this._leadsPromise = null;
  }

  /**
   * Load customers ids
   * @return {Promise<void>}
   * @private
   */
  async _loadCustomers() {
    const { error, data } = await getCustomersSubtree(this._userUUID, this._authorization);

    if (error || !Array.isArray(data)) {
      Logger.error({ message: 'Get Hierarchy Customers Subtree Query Failed', error, data });
      return [];
    }

    return data.map(({ uuid }) => uuid);
  }

  /**
   * Load operators ids
   * @return {Promise<void>}
   * @private
   */
  async _loadOperators() {
    const { error, data } = await getOperatorsSubtree(this._userUUID, this._authorization);

    if (error || !Array.isArray(data)) {
      Logger.error({ message: 'Get Hierarchy Operators Subtree Query Failed', error, data });
      return [];
    }

    return data.map(({ uuid }) => uuid);
  }

  /**
   * Load leads ids
   * @return {Promise<void>}
   * @private
   */
  async _loadLeads() {
    const { error, data } = await getLeadsSubtree(this._userUUID, this._authorization);

    if (error || !Array.isArray(data)) {
      Logger.error({ message: 'Get Hierarchy Leads Subtree Query Failed', error, data });
      return [];
    }

    return data.map(({ uuid }) => uuid);
  }

  /**
   * Get customers ids from hierarchy tree
   * @return {Array}
   */
  async getCustomersIds() {
    if (!this._customersPromise) {
      this._customersPromise = this._loadCustomers();
    }

    return await this._customersPromise;
  }

  /**
   * Get operators ids from hierarchy tree
   * @return {Array}
   */
  async getOperatorsIds() {
    if (!this._operatorsPromise) {
      this._operatorsPromise = this._loadOperators();
    }

    return await this._operatorsPromise;
  }

  /**
   * Get leads ids from hierarchy tree
   * @return {Array}
   */
  async getLeadsIds() {
    if (!this._leadsPromise) {
      this._leadsPromise = this._loadLeads();
    }

    return await this._leadsPromise;
  }
}

module.exports = Hierarchy;
