const { getProfiles } = require('./profiles');
const { userTypes, deskTypes } = require('../../../constants/hierarchy');
const { bulkProfileUpdate } = require('../../../utils/clientsRequests');
const { bulkUpdateHierarchyUser, getHierarchyBranch } = require('../../../utils/hierarchyRequests');

const getUpdateIds = async (promise, excludeIds) => {
  const pageableObj = await promise;

  if (pageableObj.error) {
    return { error: pageableObj };
  }
  console.log('pageableObj', JSON.stringify(pageableObj, null, 2));
  const ids = pageableObj.data.content.map(({ playerUUID }) => playerUUID);
  if (excludeIds.length > 0) {
    return ids.filter(id => excludeIds.indexOf(id) === -1);
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
    deskId,
    type,
    salesStatus,
    retentionStatus,
  },
  context
) => {
  const {
    headers: { authorization },
  } = context;
  let idsForUpdate = ids;

  if (allRowsSelected) {
    const ESQueryParams = {
      page: 1,
      size: totalElements,
      ...(searchParams && searchParams),
    };
    idsForUpdate = await getUpdateIds(getProfiles(_, ESQueryParams, context), ids);

    if (idsForUpdate.error) {
      return { error: idsForUpdate };
    }
  }
  let profileParams = {
    ids: idsForUpdate,
    ...(salesStatus && { salesStatus }),
    ...(retentionStatus && { retentionStatus }),
  };
  let hierarchyParams = idsForUpdate;

  if (deskId) {
    if (retentionRep || salesRep) {
      profileParams = { ...profileParams, ...(salesRep ? { salesRep } : { retentionRep }) };
      hierarchyParams = hierarchyParams.map(uuid => ({
        uuid,
        userType: userTypes.CUSTOMER,
        parentBranches: [deskId],
        parentUsers: [retentionRep || salesRep],
      }));
    } else {
      const { defaultBranch, defaultUser: deskDefaultUser, error: deskError } = await getHierarchyBranch(
        deskId,
        authorization
      );

      if (deskError) {
        return { error: deskError };
      }

      if (defaultBranch) {
        const { defaultUser, error: branchError } = await getHierarchyBranch(defaultBranch, authorization);

        if (branchError) {
          return { error: branchError };
        }
        profileParams = {
          ...profileParams,
          ...(type === deskTypes.SALES ? { salesRep: defaultUser } : { retentionRep: defaultUser }),
        };
        hierarchyParams = hierarchyParams.map(uuid => ({
          uuid,
          userType: userTypes.CUSTOMER,
          parentBranches: [deskId],
          parentUsers: [defaultUser],
        }));
      } else if (deskDefaultUser) {
        profileParams = {
          ...profileParams,
          ...(type === deskTypes.SALES ? { salesRep: deskDefaultUser } : { retentionRep: deskDefaultUser }),
        };
        hierarchyParams = hierarchyParams.map(uuid => ({
          uuid,
          userType: userTypes.CUSTOMER,
          parentBranches: [deskId],
          parentUsers: [deskDefaultUser],
        }));
      }
    }
  } else {
    profileParams = {
      ...profileParams,
      ...(salesRep && { salesRep }),
      ...(retentionRep && { retentionRep }),
    };

    if (retentionRep || salesRep) {
      hierarchyParams = hierarchyParams.map(uuid => ({
        uuid,
        userType: userTypes.CUSTOMER,
        parentBranches: [],
        parentUsers: [retentionRep || salesRep],
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
    const hierarchyBulkUpdate = await bulkUpdateHierarchyUser(hierarchyParams, authorization);

    if (hierarchyBulkUpdate.error) {
      return { error: hierarchyBulkUpdate };
    }
  }

  return { data: 'success' };
};

module.exports = {
  bulkRepresentativeUpdate,
};
