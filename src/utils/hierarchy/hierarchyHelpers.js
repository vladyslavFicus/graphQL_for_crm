const { deskTypes } = require('../../constants/hierarchy');
const { getProfiles } = require('../profile');
const { isEmpty } = require('lodash');

const getHierarchyMappedOperators = async (hierarchyOperators, dataloaders, onlyActive) => {
  const operatorsType = onlyActive ? 'activeOperators' : 'operators';
  const operators = await Promise.all(hierarchyOperators.map(({ uuid }) => dataloaders[operatorsType].load(uuid)));

  return hierarchyOperators
    .map((item, index) => {
      const { firstName, lastName, operatorStatus, error } = operators[index] || {};

      if (isEmpty(operators[index]) || error) {
        return null;
      }

      return { ...item, operatorStatus, fullName: [firstName, lastName].filter(v => v).join(' ') };
    })
    .filter(item => item);
};

const buildRequestObject = (func, success, error) => ({ func, success, error });

const multipleRequest = array =>
  Promise.all(array.map(({ func }) => func)).then(data => {
    const succeed = [];
    const errors = [];
    data.forEach((res, i) => (res.error ? errors.push(array[i].error || res) : succeed.push(array[i].success || res)));

    return {
      succeed,
      errors,
    };
  });

/**
 * Get path to representative property in object
 * Returns object with assign and unassign operator ids
 *
 * @param  {Object} profile - trading Profile
 * @param  {ENUM: [SALES, RETENTION]} type - acquisition status
 * @param  {boolean} isMove - whether move action performed
 * @return {Object}
 */
const getHierarchyAssignParams = (profile, type, isMove) => {
  // when action type and acquisition status do not match
  // we set path to another status
  const oppositeRepPath =
    type === deskTypes.SALES ? `${deskTypes.RETENTION.toLowerCase()}Rep` : `${deskTypes.SALES.toLowerCase()}Rep`;

  if (isMove) {
    const assignPath = `${type.toLowerCase()}Rep`;
    const unassignPath = oppositeRepPath;

    return {
      ...(profile[unassignPath] && { unassignFromOperator: profile[unassignPath] }),
      ...(profile[assignPath] && { assignToOperator: profile[assignPath] }),
    };
  }

  let unassignPath = `${type.toLowerCase()}Rep`;

  // check whether client acquisition status equal to action type
  // yes - set opposite path
  // no - set normal path
  if (profile.aquisitionStatus !== type) {
    unassignPath = oppositeRepPath;
  }

  return { ...(profile[unassignPath] && { unassignFromOperator: profile[unassignPath] }) };
};

/**
 * Returns an array of configured client data for update
 *
 * @param  {Promise} promise - ES query promise
 * @param  {ENUM: [SALES, RETENTION]} type - acquisition status
 * @param  {boolean} isMoveAction - whether move action performed
 * @param  {string[]} excludeIds - array of uuids to exclude from result
 * @return {Object[]}
 */
const getDataForUpdate = async (promise, { type, isMoveAction }, excludeIds) => {
  const pageableObj = await promise;

  if (pageableObj.error) {
    return { error: pageableObj };
  }

  let data = [...pageableObj.data.content];

  if (excludeIds.length) {
    data = data.filter(({ uuid }) => excludeIds.indexOf(uuid) === -1);
  }

  // throw error to FE, if any of loaded client doesn't have assigned {{type}} representative
  if (
    isMoveAction &&
    data.some(({ tradingProfile: { [`${type.toLowerCase()}Rep`]: representative } }) => !representative)
  ) {
    return { error: 'clients.bulkUpdate.moveForbidden' };
  }

  // filter clients with the acquisition status which is equals to the move type
  if (isMoveAction) {
    data = data.filter(({ tradingProfile: { aquisitionStatus } }) => aquisitionStatus !== type);
  }

  data = data.map(({ playerUUID, tradingProfile }) => ({
    uuid: playerUUID,
    ...getHierarchyAssignParams(tradingProfile, type, isMoveAction),
  }));

  if (!data.length) {
    return { error: 'Data is empty' };
  }

  return data;
};

/**
 * Returns array with objects which will be passed to update requests
 *
 * @param  {boolean} allRowsSelected - flag which shows whether all clients were selected on FE
 * @param  {Object} searchParams - params to be passed to ES query
 * @param  {number} totalElements - number of total clients to search
 * @param  {Object[]} clients - array of clients from FE
 * @param  {Object} bulkActionObject - Object which contains { type, isMoveAction }
 * @return {Promise}
 */
const getClientBulkUpdateData = async (
  { allRowsSelected, searchParams, totalElements, clients },
  bulkActionObject,
  brandId
) => {
  // return clients as they came from FE if AllRows are not selected
  // and if client length equals to totalElements
  if (!allRowsSelected || (allRowsSelected && clients.length === totalElements)) {
    return clients;
  }

  const ESQueryParams = {
    page: 0,
    size: totalElements,
    ...(searchParams && searchParams),
  };
  const excludeIds = clients.map(({ uuid }) => uuid);

  return getDataForUpdate(getProfiles(brandId, ESQueryParams), bulkActionObject, excludeIds);
};

module.exports = {
  getHierarchyMappedOperators,
  buildRequestObject,
  multipleRequest,
  getClientBulkUpdateData,
};
