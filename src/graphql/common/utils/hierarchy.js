const { getUsersByBranch } = require('../resolvers/hierarchy');

/**
 * Get additional search fields by hierarchy
 *
 * @param args Search params object
 * @param context Apollo context
 *
 * @return {Promise<*>}
 */
const getClientsSearchFieldsByHierarchy = async (args, context) => {
  const searchFields = {};

  if (args) {
    // Get representative ids, when desks or teams arg provided
    if (!(Array.isArray(args.repIds) && args.repIds.length) && (args.desk || args.team)) {
      const branchOperators = await getUsersByBranch(null, { uuid: args.team || args.desk }, context);

      if (branchOperators.error) {
        return branchOperators;
      }

      searchFields.repIds = branchOperators.data.map(({ uuid }) => uuid);
    }

    // Search clients only by hierarchy
    searchFields.ids = await context.hierarchy.getCustomersIds();
  }

  return searchFields;
};

module.exports = {
  getClientsSearchFieldsByHierarchy,
};
