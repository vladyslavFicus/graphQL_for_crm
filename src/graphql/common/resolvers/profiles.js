const { getProfiles: getProfilesRequest } = require('../../../utils/profile');
const accessValidate = require('../../../utils/accessValidate');
const { getUsersByBranch } = require('./hierarchy');

const getProfiles = async function(_, args, context) {
  const access = await accessValidate(context);

  if (access.error) {
    return { error: access.error };
  }

  const customersIds = await context.hierarchy.getCustomersIds();
  let repIds = args.repIds;

  // Get representative ids, when desks or teams arg provided
  if (!(Array.isArray(repIds) && repIds.length) && (args.desk || args.team)) {
    const branchOperators = await getUsersByBranch(null, { uuid: args.team || args.desk }, context);

    if (branchOperators.error) {
      return branchOperators;
    }

    repIds = branchOperators.data.map(({ uuid }) => uuid);
  }

  return getProfilesRequest(context.brand.id, { ...args, repIds, ids: customersIds });
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
