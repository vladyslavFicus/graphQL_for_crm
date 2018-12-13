const { getProfiles } = require('./profiles');
const { userTypes, deskTypes } = require('../../../constants/hierarchy');
const { bulkProfileUpdate } = require('../../../utils/clientsRequests');
const { bulkUpdateHierarchyUser, getHierarchyBranch, getHierarchyUser } = require('../../../utils/hierarchyRequests');

const getUpdateIds = async (promise, excludeIds) => {
  const pageableObj = await promise;

  if (pageableObj.error) {
    return { error: pageableObj };
  }
  const ids = pageableObj.data.content.map(({ playerUUID }) => playerUUID);

  if (excludeIds.length > 0) {
    return ids.filter(id => excludeIds.indexOf(id) === -1);
  }

  return ids;
};

const getIds = async ({ allRowsSelected, searchParams, totalElements, ids }, context) => {
  if (allRowsSelected) {
    const ESQueryParams = {
      page: 1,
      size: totalElements,
      ...(searchParams && searchParams),
    };
    const idsForUpdate = await getUpdateIds(getProfiles(null, ESQueryParams, context), ids);

    if (idsForUpdate.error || idsForUpdate.jwtError) {
      return { error: idsForUpdate };
    }

    return idsForUpdate;
  }

  return ids;
};

const bulkRepresentativeUpdate = async (
  _,
  {
    allRowsSelected,
    ids,
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
  const idsForUpdate = await getIds({ allRowsSelected, searchParams, totalElements, ids }, context);

  if (idsForUpdate.error) {
    return { error: idsForUpdate.error };
  }

  let profileParams = {
    ids: idsForUpdate,
    brandId,
    ...(salesStatus && { salesStatus }),
    ...(retentionStatus && { retentionStatus }),
    ...(salesRep && { salesRep }),
    ...(retentionRep && { retentionRep }),
    ...(aquisitionStatus && { aquisitionStatus }),
  };
  let hierarchyParams = idsForUpdate;

  if (teamId) {
    if (retentionRep || salesRep) {
      hierarchyParams = hierarchyParams.map(uuid => ({
        uuid,
        userType: userTypes.CUSTOMER,
        parentBranches: [teamId],
        parentUsers: [retentionRep || salesRep],
      }));
    } else {
      const { defaultUser, error, jwtError } = await getHierarchyBranch(teamId, authorization);

      if (error || jwtError) {
        return { error: error || jwtError };
      }

      profileParams = {
        ...profileParams,
        ...(type === deskTypes.SALES ? { salesRep: defaultUser } : { retentionRep: defaultUser }),
      };
      hierarchyParams = hierarchyParams.map(uuid => ({
        uuid,
        userType: userTypes.CUSTOMER,
        parentBranches: [teamId],
        parentUsers: [defaultUser],
      }));
    }
  } else {
    if (retentionRep || salesRep) {
      const { error, jwtError, parentBranches } = await getHierarchyUser(retentionRep || salesRep, authorization);

      if (error || jwtError) {
        return { error: error || jwtError };
      }

      hierarchyParams = hierarchyParams.map(uuid => ({
        uuid,
        userType: userTypes.CUSTOMER,
        parentUsers: [retentionRep || salesRep],
        ...(parentBranches && parentBranches[0] && { parentBranches: [parentBranches[0].uuid] }),
      }));
    } else {
      hierarchyParams = null;
    }
  }
  const profileBulkUpdate = await bulkProfileUpdate(profileParams, authorization);

  if (profileBulkUpdate.error) {
    return { error: profileBulkUpdate };
  }

  if (hierarchyParams) {
    const hierarchyBulkUpdate = await bulkUpdateHierarchyUser({ users: hierarchyParams }, authorization);

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
