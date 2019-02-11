const { getProfiles: getProfilesRequest } = require('../../../utils/profile');
const accessValidate = require('../../../utils/accessValidate');

const getProfiles = async function(_, args, context) {
  const access = await accessValidate(context);

  if (access.error) {
    return { error: access.error };
  }

  const customersIds = await context.hierarchy.getCustomersIds();

  return getProfilesRequest(context.brand.id, { ...args, ids: customersIds });
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
