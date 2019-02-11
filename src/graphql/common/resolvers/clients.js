const { get } = require('lodash');
const { getProfiles } = require('./profiles');
const { userTypes } = require('../../../constants/hierarchy');
const { bulkProfileUpdate } = require('../../../utils/clientsRequests');
const { bulkMassAssignHierarchyUser, getHierarchyBranch } = require('../../../utils/hierarchyRequests');

const getDataForUpdate = async (promise, operatorType, excludeIds) => {
  const pageableObj = await promise;

  if (pageableObj.error) {
    return { error: pageableObj };
  }
  const data = pageableObj.data.content.map(({ playerUUID, tradingProfile }) => ({
    uuid: playerUUID,
    unassignFrom: get(tradingProfile, `${operatorType.toLowerCase()}Rep`) || null,
  }));

  if (excludeIds.length) {
    return data.filter(({ uuid }) => excludeIds.indexOf(uuid) === -1);
  }

  return data;
};

const getClientUpdateData = async ({ allRowsSelected, searchParams, totalElements, clients, type }, context) => {
  if (!allRowsSelected || (allRowsSelected && clients.length === totalElements)) {
    return clients;
  }

  const ESQueryParams = {
    page: 0,
    size: totalElements,
    ...(searchParams && searchParams),
  };

  const excludeIds = clients.map(({ uuid }) => uuid);
  const data = await getDataForUpdate(getProfiles(null, ESQueryParams, context), type, excludeIds);

  if (data.error || data.jwtError) {
    return { error: data };
  }

  return data;
};

const bulkRepresentativeUpdate = async (
  _,
  {
    allRowsSelected,
    clients,
    searchParams,
    totalElements,
    salesRep,
    retentionRep,
    teamId,
    type,
    salesStatus,
    retentionStatus,
    aquisitionStatus,
  },
  context
) => {
  const {
    headers: { authorization },
    brand: { id: brandId },
  } = context;

  const updateData = await getClientUpdateData(
    { allRowsSelected, searchParams, totalElements, clients, type },
    context
  );

  if (updateData.error) {
    return { error: updateData.error };
  }

  let profileParams = {
    ids: updateData.map(({ uuid }) => uuid),
    brandId,
    ...(salesStatus && { salesStatus }),
    ...(retentionStatus && { retentionStatus }),
    ...(aquisitionStatus && { aquisitionStatus }),
  };
  let hierarchyParams = {
    userType: userTypes.CUSTOMER,
    users: updateData,
  };

  if (retentionRep || salesRep) {
    hierarchyParams.parentUsers = retentionRep || salesRep;
  } else {
    if (teamId) {
      const {
        data: { defaultUser },
        error,
      } = await getHierarchyBranch(teamId, authorization);

      if (error) {
        return { error };
      }

      if (defaultUser) {
        hierarchyParams.parentUsers = [defaultUser];
      } else {
        hierarchyParams = null;
      }
    } else {
      hierarchyParams = null;
    }
  }

  // HACK: not to do request when there is no other params except {brandId} and {ids}
  if (Object.keys(profileParams).length !== 2) {
    const profileBulkUpdate = await bulkProfileUpdate(profileParams, authorization);

    if (profileBulkUpdate.error) {
      return { error: profileBulkUpdate };
    }
  }

  if (hierarchyParams) {
    const hierarchyBulkUpdate = await bulkMassAssignHierarchyUser(hierarchyParams, authorization);

    if (hierarchyBulkUpdate.error) {
      return { error: hierarchyBulkUpdate };
    }
  }

  return { data: 'success' };
};

const profileBulkUpdate = async (
  _,
  { allRowsSelected, ids, searchParams, totalElements, aquisitionStatus },
  context
) => {
  const {
    headers: { authorization },
    brand: { id: brandId },
  } = context;
  const idsForUpdate = await getIds({ allRowsSelected, searchParams, totalElements, ids }, context);

  if (idsForUpdate.error) {
    return { error: idsForUpdate.error };
  }

  const bulkUpdate = await bulkProfileUpdate({ brandId, aquisitionStatus, ids }, authorization);

  if (bulkUpdate.error) {
    return { error: bulkUpdate };
  }

  return { data: 'success' };
};

module.exports = {
  bulkRepresentativeUpdate,
  profileBulkUpdate,
};
