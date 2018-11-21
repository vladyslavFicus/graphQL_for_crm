const { getHierarchyUserSubtree } = require('../utils/hierarchyRequests');
const { userTypes } = require('../constants/hierarchy');

/**
 * Load hierarchy users by userUUID (OPERATOR UUID)
 * @param userUUID
 * @param department
 * @param authorization
 * @return {Promise<{[p: string]: Array}>}
 */
const loadHierarchy = async (userUUID, department, authorization) => {
  const hierarchy = Object.keys(userTypes).reduce((acc, curr) => ({ ...acc, [curr]: [] }), {});

  hierarchy.isAdministration = department === 'ADMINISTRATION';

  // HACK: Return empty arrays of hierarchy for simple users (clients) for prevent auth error
  if (department === 'PLAYER') {
    return hierarchy;
  }

  // Administrators can see all operators and their clients, so we don't need any restrictions here
  if (!hierarchy.isAdministration) {
    const subtree = await getHierarchyUserSubtree(userUUID, authorization);

    subtree.forEach(branch => {
      hierarchy[branch.userType] = [...hierarchy[branch.userType], branch.uuid];
    });
  }

  return hierarchy;
};

module.exports = {
  loadHierarchy,
};
