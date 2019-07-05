const { userTypes } = require('../../../constants/hierarchy');
const { bulkProfileUpdate } = require('../../../utils/clientsRequests');
const {
  requests: { bulkUpdateHierarchyUser, bulkMassAssignHierarchyUser, getHierarchyBranch },
  helpers: { getClientBulkUpdateData },
} = require('../../../utils/hierarchy');
const accessValidate = require('../../../utils/accessValidate');

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
    isMoveAction,
    salesStatus,
    retentionStatus,
  },
  context
) => {
  const {
    headers: { authorization },
    brand: { id: brandId },
    hierarchy,
  } = context;

  // check access cause we can perform ES query at line 38
  const access = await accessValidate(context);

  if (access.error) {
    return { error: access.error };
  }

  let updateData = await getClientBulkUpdateData(
    { allRowsSelected, searchParams, totalElements, clients },
    { type, isMoveAction },
    { brandId, hierarchy }
  );

  if (updateData.error) {
    return updateData;
  }

  // filter out nullable entries in array
  updateData = updateData.filter(item => item);

  let profileParams = {
    ids: updateData.map(({ uuid }) => uuid),
    brandId,
    ...(salesStatus && { salesStatus }),
    ...(retentionStatus && { retentionStatus }),
  };

  let hierarchyParams = {
    userUuids: updateData.map(({ uuid }) => uuid),
  };

  if (!isMoveAction) {
    if (retentionRep || salesRep) {
      hierarchyParams.parentUsers = retentionRep || salesRep;
    } else {
      if (teamId) {
        const {
          data: { defaultUser },
          error,
        } = await getHierarchyBranch(teamId, authorization);

        if (error) {
          return error;
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
  }

  // Skip request when there is no other params except {brandId} and {ids}
  if (Object.keys(profileParams).length !== 2) {
    const profileBulkUpdate = await bulkProfileUpdate(profileParams, authorization);

    if (profileBulkUpdate.error) {
      return profileBulkUpdate;
    }
  }

  if (hierarchyParams && hierarchyParams.userUuids.length) {
    let hierarchyBulkUpdate = null;

    // if move action performed, we need to call another api with modified params
    if (isMoveAction) {
      hierarchyBulkUpdate = await bulkUpdateHierarchyUser({ assignments: updateData }, authorization);
    } else {
      hierarchyBulkUpdate = await bulkMassAssignHierarchyUser(hierarchyParams, authorization);
    }

    if (hierarchyBulkUpdate.error) {
      return hierarchyBulkUpdate;
    }
  }

  return { data: 'success' };
};

module.exports = {
  bulkRepresentativeUpdate,
};
