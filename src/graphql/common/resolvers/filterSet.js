const {
  getFilterSetByUserId,
  createFilterSet: createFilterSetQuery,
  getFilterSetById: getFilterSetByIdQuery,
  updateFilterSet: updateFilterSetQuery,
  updateFilterFavourite: updateFilterFavouriteQuery,
  deleteFilterSet: deleteFilterSetQuery,
} = require('../../../utils/filterSetRequests');
const { getUsersByBranch } = require('./hierarchy');

const getFilterSets = (_, args, { headers: { authorization }, userUUID }) => {
  return getFilterSetByUserId({ userId: userUUID, ...args }, authorization);
};

const getFilterSetById = async (_, args, { headers: { authorization }, hierarchy, dataloaders }) => {
  const { error, data } = await getFilterSetByIdQuery(args, authorization);

  if (error) {
    return { error };
  }

  let newRepIds = [];

  // This logic needs to be presented to filter out operators on filter grid
  if (data.repIds) {
    const visibleOperators = await hierarchy.getOperatorsIds();
    // filter out operators, which can be moved somewhere and now is not visible for current operator
    newRepIds = visibleOperators.filter(({ uuid }) => data.repIds.includes(uuid));
  } else {
    if (data.desk || data.team) {
      const branchOperators = await getUsersByBranch(
        null,
        { uuid: data.team || data.desk },
        { headers: { authorization }, dataloaders }
      );

      if (branchOperators.error) {
        return branchOperators;
      }

      newRepIds = branchOperators.data.map(({ uuid, fullName, operatorStatus }) => ({
        uuid,
        fullName,
        operatorStatus,
      }));
    }
  }

  return {
    data: {
      ...data,
      ...(newRepIds.length && { branchRepresentatives: newRepIds }),
    },
  };
};

const createFilterSet = (_, args, { headers: { authorization }, userUUID }) => {
  return createFilterSetQuery({ userId: userUUID, ...args }, authorization);
};

const updateFilterSet = (_, args, { headers: { authorization } }) => {
  return updateFilterSetQuery(args, authorization);
};

const updateFilterFavourite = (_, args, { headers: { authorization } }) => {
  return updateFilterFavouriteQuery(args, authorization);
};

const deleteFilterSet = (_, args, { headers: { authorization } }) => {
  return deleteFilterSetQuery(args, authorization);
};

module.exports = {
  getFilterSets,
  getFilterSetById,
  createFilterSet,
  updateFilterSet,
  updateFilterFavourite,
  deleteFilterSet,
};
