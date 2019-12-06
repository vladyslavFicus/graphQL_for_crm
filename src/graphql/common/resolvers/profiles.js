const { getProfiles: getProfilesRequest } = require('../../../utils/profile');

const getProfiles = async function(
  _,
  {
    args: {
      searchLimit,
      page: { from, size },
      ...rest
    },
  },
  { headers: { authorization } }
) {
  const data = {
    page: {
      from,
      size: searchLimit || size,
    },
    ...rest,
  };

  return getProfilesRequest(data, authorization);
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
