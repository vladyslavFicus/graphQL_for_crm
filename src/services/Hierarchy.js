const {
  requests: { getCustomersSubtree, getLeadsSubtree, getOperatorsSubtree, getPartnersSubtree },
} = require('../utils/hierarchy');

class Hierarchy {
  constructor(userUUID, authorization) {
    this._userUUID = userUUID;
    this._authorization = authorization;

    this._customersPromise = null;
    this._operatorsPromise = null;
    this._partnersPromise = null;
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
      return [];
    }

    return data.map(({ uuid }) => uuid);
  }

  /**
   * Load partners ids
   * @return {Promise<void>}
   * @private
   */
  async _loadPartners() {
    const { error, data } = await getPartnersSubtree(this._userUUID, this._authorization);

    if (error || !Array.isArray(data)) {
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
   * Get partners ids from hierarchy tree
   * @return {Array}
   */
  async getPartnersIds() {
    if (!this._partnersPromise) {
      this._partnersPromise = this._loadPartners();
    }

    return await this._partnersPromise;
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
