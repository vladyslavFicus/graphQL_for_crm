const {
  getFilterSetByUserId,
  createFilterSet: createFilterSetQuery,
  getFilterSetById: getFilterSetByIdQuery,
  updateFilterSet: updateFilterSetQuery,
  updateFilterFavourite: updateFilterFavouriteQuery,
  deleteFilterSet: deleteFilterSetQuery,
} = require('../../../utils/filterSetRequests');

const getFilterSets = (_, args, { headers: { authorization }, userUUID }) => {
  return getFilterSetByUserId({ userId: userUUID, ...args }, authorization);
};

const getFilterSetById = (_, args, { headers: { authorization } }) => {
  return getFilterSetByIdQuery(args, authorization);
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
