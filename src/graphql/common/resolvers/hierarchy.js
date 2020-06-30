const { groupBy } = require('lodash');
const {
  requests: {
    getUsersByType: getUsersByTypeQuery,
  },
  helpers: { getHierarchyMappedOperators },
} = require('../../../utils/hierarchy');

const getUsersByType = async (_, args, { headers: { authorization }, hierarchy, dataloaders }) => {
  const users = await getUsersByTypeQuery(args.userTypes, authorization);

  if (users.error) {
    return users;
  }

  const visibleUsers = await hierarchy.getOperatorsIds();
  const hierarchyUsers = users.data.filter(({ uuid }) => visibleUsers.includes(uuid));
  const mappedUsers = await getHierarchyMappedOperators(hierarchyUsers, dataloaders, args.onlyActive);

  return { data: groupBy(mappedUsers, 'userType') };
};

module.exports = {
  getUsersByType,
};
