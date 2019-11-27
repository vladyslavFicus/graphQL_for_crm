const { getProfiles: getProfilesRequest } = require('../../../utils/profile');

const getProfiles = async function(_, args, { headers: { authorization } }) {
  return getProfilesRequest(args.args, authorization);
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
