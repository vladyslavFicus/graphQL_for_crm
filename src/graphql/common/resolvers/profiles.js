const { getProfiles: getProfilesRequest } = require('../../../utils/profile');
const accessValidate = require('../../../utils/accessValidate');
const { getClientsSearchFieldsByHierarchy } = require('../utils/hierarchy');

const getProfiles = async function(_, args, context) {
  const access = await accessValidate(context);

  if (access.error) {
    return { error: access.error };
  }

  const hierarchySearchFields = await getClientsSearchFieldsByHierarchy(args, context);
  const searchFields = { ...args, ...hierarchySearchFields };

  return getProfilesRequest(context.brand.id, searchFields);
};

/**
 * Retrieve profile depends on source fieldName
 *
 * @param fieldName
 * @return {Function}
 */
const getProfile = fieldName => ({ [fieldName]: profileId }, _, { dataloaders }) => {
  return dataloaders.clients.load(profileId);
};

module.exports = {
  getProfiles,
  getProfile,
};
