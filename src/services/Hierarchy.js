const { values, omit, pick, flatten } = require('lodash');
const { userTypes } = require('../constants/hierarchy');

class Hierarchy {
  constructor() {
    this.types = this._initPrimaryTypes();

    return this;
  }

  /**
   * Init primary user types with empty array of ids
   * @private
   */
  _initPrimaryTypes() {
    return Object.keys(userTypes).reduce((acc, curr) => ({ ...acc, [curr]: [] }), {});
  }

  /**
   * Set hierarchy subtree from response (hierarchy-service)/user/{uuid}/hierarchy
   * @param hierarchySubtree
   * @return {Hierarchy}
   */
  setHierarchySubtree(hierarchySubtree) {
    hierarchySubtree.forEach(({ uuid, userType }) => {
      this.types[userType] = [...this.types[userType], uuid];
    });

    return this;
  }

  /**
   * Get all user types
   * @return {Array}
   */
  getAllTypes() {
    return values(userTypes);
  }

  /**
   * Get filtered operator types
   * @return {Array}
   */
  getOperatorTypes() {
    return values(omit(userTypes, [...this.getCustomerTypes(), ...this.getLeadCustomerTypes()]));
  }

  /**
   * Get filtered customer types
   * @return {Array}
   */
  getCustomerTypes() {
    return [userTypes.CUSTOMER];
  }

  /**
   * Get filtered leads types
   * @return {Array}
   */
  getLeadCustomerTypes() {
    return [userTypes.LEAD_CUSTOMER];
  }

  /**
   * Get all ids from hierarchy tree
   * @return {Array}
   */
  getAllIds() {
    return flatten(values(this.types));
  }

  /**
   * Get filtered operator ids from hierarchy tree
   * @return {Array}
   */
  getOperatorsIds() {
    return flatten(values(pick(this.types, this.getOperatorTypes())));
  }

  /**
   * Get filtered customer ids from hierarchy tree
   * @return {Array}
   */
  getCustomerIds() {
    return flatten(values(pick(this.types, this.getCustomerTypes())));
  }

  /**
   * Get filtered leads ids from hierarchy tree
   * @return {Array}
   */
  getLeadCustomersIds() {
    return flatten(values(pick(this.types, this.getLeadCustomerTypes())));
  }

  /**
   * FAST FIX removed dependency on isAdministration
   * Helper method for build query args depends on isAdministration flag
   * Example:
   *
   * If administration:
   * -----------------------------------------------
   * (isAdministration = true)
   * buildQueryArgs(args, { operatorIds: [...] }) // return only args, because administrator can see all entities
   * -----------------------------------------------
   *
   * If isn't administration:
   * -----------------------------------------------
   * (isAdministration = false)
   * buildQueryArgs(args, { operatorIds: [...] }) // return assigned object { ...{ operatorIds: [...] }, ...args }
   * -----------------------------------------------
   *
   * @param args
   * @param filter
   * @return {{}}
   */
  buildQueryArgs(args, filter) {
    return { ...args, ...filter };
  }
}

module.exports = Hierarchy;
